# Réaliser un Toon Shader : Transformer la lumière en aplats de couleurs via le Cell Shading

![Résultat final du Cell Shading](resources/videos/CellShading.gif)

Le **Toon Shading** est un style visuel iconique dans le jeu vidéo qui cherche à imiter l'esthétique des bandes dessinées. C'est un sujet vaste qui repose principalement sur deux piliers : la gestion de la lumière (Cell Shading) et les contours (Outlining).

Dans ce cinquième projet de ma roadmap Technical Art, je me concentre sur le premier pilier : le **Cell Shading**. L'objectif est d'apprendre à manipuler les mathématiques de la lumière pour reproduire ce dégradé net de l'ombre qu'on retrouve souvent dans les films d'animation japonaise ou les comics. Nous allons voir comment gérer deux des composantes fondamentales de l'éclairage : la **Diffuse Light** (lumière diffuse) et l'**Ambiant Light** (lumière ambiante).

---

## Les Modèles de Lumière : Blinn et Phong

Avant de styliser la lumière, il faut comprendre comment les moteurs de jeu la simulent par défaut. Pour cela, on utilise des **modèles de lumière** qui sont des formules mathématiques définissant la couleur de chaque pixel en fonction de la source lumineuse.

```hlsl
// La somme finale d'un modèle de lumière classique
float3 finalColor = ambiantColor + diffuseColor + specularColor;
```

Le modèle le plus célèbre est celui de **Blinn-Phong**. Il décompose l'éclairage en une "trinité" :
1.  **Ambiant Light :** En réalité, la lumière ne s'arrête pas net dès qu'elle touche une surface : elle rebondit sur l'environnement (Global Illumination). Simuler ces milliers de rebonds en temps réel serait mathématiquement trop coûteux en performance pour un jeu. C'est pour cela qu'on privilégie une **lumière ambiante globale** qui touche toutes les faces de la même manière. Ainsi, on évite que les zones non éclairées ne soient d'un noir pur, sans impacter les performances.
2.  **Diffuse Light :** C'est la lumière de base qui définit la forme. Elle est maximale quand la face est directement opposée au soleil et diminue au fur et à mesure que l'angle entre la source de la lumière et la face augmente.
3.  **Specular Light :** C'est le reflet brillant qui simule la réflexion directe de la source lumineuse. Sa position varie en fonction de là où on regarde l'objet qui reçoit la lumière (nous l'aborderons dans le prochain projet).

---

## Architecture de Rendu : Forward vs Deferred

Avant de passer à la suite, il est important de comprendre la méthode de rendu des deux moteurs les plus populaires : Unreal Engine et Unity. Le mode de calcul du Cell Shading change radicalement selon la pipeline de rendu du moteur. 

> Une pipeline est la méthode utilisée par la carte graphique pour préparer l'image finale.    
> Pour faire simple, il s'agit d'une succession d'étapes techniques (Vertex Processing, Rasterization, Fragment Processing) qui transforment les données géométriques 3D en pixels 2D affichables à l'écran.

Voici les deux méthodes utilisées par les moteurs :
*   **Forward Rendering (Standard Unity URP) :** Le moteur traite les objets un par un. Pour chaque objet, il calcule sa géométrie et l'influence de toutes les lumières en une seule étape. C'est simple, performant pour la VR/Mobile, et nous donne un accès direct aux données de lumière dans le shader de l'objet.
*   **Deferred Rendering (Standard Unreal Engine) :** Le moteur sépare la géométrie de la lumière. Il remplit d'abord des textures appelées **G-Buffers** qui contiennent différentes informations (couleur, normale, profondeur). Puis, elle calcule l'éclairage global à la toute fin sur l'image entière. Cela permet de gérer des milliers de lumières, mais rend l'accès aux données lumineuses plus complexe pour un matériau individuel.

> **Note :** Unity 6 utilise désormais le **Forward+**, qui mélange les deux approches en découpant l'écran en cases (tiles) pour trier les lumières avant de dessiner les objets.

> Pour plus d'informations sur le fonctionnement du Forward et du Deferred Rendering, je vous invite à consulter ce [lien](https://researchandprogram.blogspot.com/2023/10/unity-rendering-paths-.html)

---

## Implémentation Unity : Forward Rendering

En mode Forward, nous créons le Cell Shading directement à l'intérieur du shader de l'objet.

### La Diffuse Light et le Produit Scalaire
Le cœur du calcul repose sur le **Dot Product (N·L)**. On compare le vecteur de la Normale (la direction de la face) avec le vecteur de la Lumière (direction du soleil).
*   Si le résultat est 1, la face est face au soleil.
*   Si le résultat est 0, la face est perpendiculaire et donc, pas éclairée par la source de lumière.

```hlsl
// Calcul de la direction de la lumière et des normales
float3 lightDirection = mainLight.direction;
float3 normalDirection = normalize(v2f.normal);

// Produit scalaire pour déterminer l'intensité lumineuse
float dotResult = dot(normalDirection, -lightDirection);
```

### Half-Lambert et Smoothstep
Pour obtenir un look "Anime", on utilise deux astuces :
1.  **Half-Lambert :** Une technique de Valve qui remappe la plage de lumière de [-1, 1] vers [0, 1]. Cela "pousse" la lumière plus loin dans les ombres et évite que les faces perpendiculaires de notre objet soient noires.
2.  **Smoothstep :** Cette fonction nous permet de "trancher" le dégradé. En utilisant des seuils proches, on transforme la transition douce en une ligne de démarcation nette entre l'ombre et la lumière.

```hlsl
// Remappage Half-Lambert et application du seuil net (Smoothstep)
float halfLambert = (dotResult * 0.5) + 0.5;
float intensity = smoothstep(_DiffuseThreshold + _Smoothing, _DiffuseThreshold - _Smoothing, halfLambert);

// Application de la couleur finale
diffuseColor *= _DiffuseTint.rgb * intensity * mainLight.color;
```

![Rendu de la Diffuse Light dans Unity](resources/visuels/posts/cellshading/diffuse_lighting.png)

### Ambiant Light
Enfin, on ajoute la teinte ambiante. On multiplie la texture de l'objet par une couleur globale (`AmbientTint`) pour que les zones d'ombre aient une identité colorée (souvent bleutée).

```hlsl
// Application de la lumière ambiante sur la texture
float3 ambiantColor = texColor.rgb * _AmbiantTint.rgb;
```

![Rendu de l'ambiant light dans Unity](resources/visuels/posts/cellshading/ambiant_lighting.png)

![Rendu du Cell Shading dans Unity](resources/visuels/posts/cellshading/cell_shading.png)

---

## 4. Implémentation Unreal : Deferred Rendering

Sur Unreal, la solution consiste à utiliser un **Post-Process Material**.

### L'extraction de la lumière
On divise la `SceneColor` par la `BaseColor`. Le résultat nous donne uniquement les données d'éclairage de la scène.

### Création du masque
1.  **Désaturation :** Pour obtenir un masque de lumière en noir et blanc.
2.  **Quantisation :** On applique un `smoothstep` pour créer nos bandes de couleurs.
3.  **Ré-application :** On utilise ce masque pour faire un `Lerp` entre la texture d'origine et une version assombrie.

![Logic des nodes Unreal pour isoler la lumière](resources/visuels/posts/cellshading/ue_nodes_cell_shading.png)

> Un problème courant avec cette méthode de division est que le ciel (Skybox) se retrouve souvent noir ou avec des artefacts visuels, car il n'est pas considéré comme une surface géométrique standard et renvoie des valeurs de BaseColor nulles ou infinies. Pour corriger cela, on utilise le nœud **SceneDepth** afin de créer un masque de distance : si le pixel est trop éloigné (proche de l'infini), on ignore le calcul du Cell Shading pour afficher simplement la SceneColor originale.

![Logic des nodes Unreal pour implémenter la solution SceneDepth](resources/visuels/posts/cellshading/ue_nodes_scene_depth.png)

---

## Conclusion

Le Cell Shading montre que le Technical Art consiste souvent à détourner des lois physiques (comme le modèle de Blinn-Phong) pour servir une direction artistique. Dans le prochain chapitre, nous ajouterons les reflets spéculaires et la **Rim Light** pour détacher nos objets du décor.

![Résultat final du Cell Shading](resources/videos/CellShading.gif)

