
# Personnaliser le rendu visuel via le post-process & le color grading

Le rendu brut d'un moteur de jeu peut parfois manquer d'identité. Pour cette troisième étape de ma roadmap, je me suis penché sur le **Color Grading**. Contrairement aux shaders d'objets, le post-process agit directement sur l'image finale envoyée à l'écran, permettant de personnaliser l'atmosphère globale du projet.

![Comparaison : Rendu Classique vs Rendu Color Gradé](resources/visuels/posts/colorgrading/cg_result.png)

Contrairement aux précédents projets, l'objectif ici n'est pas de suivre un déroulement linéaire, mais de présenter plusieurs notions fondamentales de la colorimétrie et leur implémentation technique sous forme de shader.

## Qu'est-ce que le Color Grading ?
Le Color Grading (ou étalonnage) consiste à modifier l'apparence d'une image. En jeu vidéo, il sert à renforcer une narration, simuler une caméra spécifique ou simplement donner une signature visuelle unique. Un exemple concret est l'obtention d'un rendu "Noir" ou "Cinématique", où la gestion de la lumière et des teintes prime sur la couleur brute.

---

## Première notion : Le Contraste
Le contraste définit l'écart d'intensité entre les zones sombres et les zones claires d'une scène. Un contraste élevé renforce la profondeur mais peut rapidement effacer les ombres et les surbrillances.

Pour modifier le contraste sans décaler l'exposition globale, on utilise la méthode du **Pivot**. On effectue le calcul autour de la valeur 0.5 car il s'agit de la valeur centrale sur une échelle de gris.   
Voilà les étapes : 
1. On soustrait 0.5 à la couleur pour centrer les valeurs.
2. On multiplie par le facteur de contraste.
3. On réajoute 0.5 pour replacer le résultat dans la plage de couleur standard.

```hlsl
// Implémentation du contraste avec pivot à 0.5
float3 color = (texColor.rgb - 0.5) * _Contrast + 0.5;
```

> Dans l'éditeur de matériaux d'Unreal Engine, l'accès aux pixels rendus par la caméra ne se fait pas via une texture classique.   
> Il faut utiliser le nœud **SceneTexture** et régler son ID sur **PostProcessInput0**. C'est cette entrée qui récupère l'image de la scène avant l'application de l'effet.

![Nodes à ajouter dans Unreal pour le contraste.](resources/visuels/posts/colorgrading/cg_nodes_contrast.png)

![Rendu illustrant l'ajustement du contraste dans Unreal](resources/visuels/posts/colorgrading/cg_rendu_contrast.png)

---

## Deuxième notion : La Saturation et la Luminance
La saturation contrôle l'intensité des couleurs. C'est grâce à cela que l'on va passer les images en noir et blanc par exemple.

La saturation définit à quel point on utilise la luminance dans notre scène.
Pour faire simple, la luminance est la brillance d'une couleur telle qu'elle est perçue par l'œil humain.
L’œil humain ne perçoit pas toutes les couleurs avec la même intensité. À puissance égale, un vert nous paraîtra toujours plus brillant qu'un bleu. C'est pourquoi, pour un rendu réaliste, on utilise un vecteur de luminance standard : `(0.2126, 0.7152, 0.0722)`.
Voilà comment utiliser la luminance pour setup la saturation : 

1. On effectue un **produit scalaire (Dot Product)** entre le pixel et ce vecteur de luminance pour obtenir une valeur de gris parfaite.
2. Ensuite, on utilise une interpolation linéaire (**Lerp**) pour naviguer entre cette valeur grise et la couleur originale en fonction du paramètre de saturation.

```hlsl
// Calcul de la luminance et de la saturation
float luma = dot(color, float3(0.2126, 0.7152, 0.0722));
float3 saturatedColor = lerp(luma.xxx, color, _Saturation);
```

![Nodes à ajouter dans Unreal pour la saturation.](resources/visuels/posts/colorgrading/cg_nodes_saturation.png)

![Rendu illustrant la saturation basée sur la luminance dans Unreal](resources/visuels/posts/colorgrading/cg_rendu_saturation.png)

---

## Troisième notion : L'isolation d'une couleur
Cette technique consiste à désaturer toute la scène à l'exception d'une teinte précise (par exemple, ne garder que le rouge pour un effet dramatique).

Pour réaliser cette isolation, on doit calculer la distance euclidienne entre la couleur du pixel actuel et une couleur cible. 
- Si la distance est faible (proche de 0), le pixel est conservé.
- Si elle est élevée, le pixel subit la désaturation qu'on a vue précédemment.

```hlsl
// Isolation de couleur via la distance et un masque
float d = distance(texColor.rgb, _TargetColor.rgb);
float mask = 1.0 - smoothstep(_Threshold, _Threshold + _Softness, d);
float3 isolatedColor = lerp(desaturateColor.rgb, textureColor.rgb, mask);
```

![Nodes à ajouter dans Unreal pour l'isolation de couleurs.](resources/visuels/posts/colorgrading/cg_nodes_color_isolation.png)

L'utilisation de la fonction `smoothstep` permet de lisser la transition et d'éviter des contours pixelisés sur les zones isolées.

![Rendu illustrant l'isolation de couleur avec désaturation totale sur les zones non isolées.](resources/visuels/posts/colorgrading/cg_rendu_color_isolation.png)

---

## Configuration du Post-Process
Une fois le shader écrit, il doit être injecté dans le pipeline de rendu du moteur. Entre Unity et Unreal le setup n'est pas du tout le même.

### Dans Unity (URP)

Il vous faut obligatoirement un projet utilisant l'URP ou le HDRP, cela peut être déterminé à la création du projet ou rajouté par la suite.

1. Dans le code du shader, j'ai utilisé la **Full Screen Pass Renderer Feature**. Cela permet d'appliquer le shader après le rendu de la scène.
2. Pour optimiser les performances, le shader utilise un **Fullscreen Triangle** via `SV_VertexID`, évitant ainsi de charger un mesh de type Quad en mémoire.
3. Créez un matériau se basant sur votre shader.
4. Accédez aux settings URP de votre scène puis remplacez le matériau existant par le nouveau, créé précédemment.

```hlsl
// Utilisation de SV_VertexID pour générer le triangle plein écran
Varyings vert (Attributes input) {
    Varyings output;
    output.positionCS = GetFullScreenTriangleVertexPosition(input.vertexID);
    output.uv = GetFullScreenTriangleTexCoord(input.vertexID);
    return output;
}
```

![Setup du Renderer Feature dans Unity](resources/visuels/posts/colorgrading/cg_postprocess_unity.png)

### Dans Unreal Engine

1. Dans votre Material, configurez votre output en domaine "Post Process" et assignez-le dans la section "Rendering Features". 
2. Pour garantir que les modifications de couleurs ne soient pas écrasées par les calculs HDR natifs du moteur, réglez le point d'injection sur `After Tonemapping`.
3. Dans votre scène, créez un **Post Process Volume**.
4. Assignez-lui votre nouveau matériau.

![Setup du Material Domain dans Unreal](resources/visuels/posts/colorgrading/cg_postprocess_unreal.png)

![Setup du Post Process Volume dans Unreal](resources/visuels/posts/colorgrading/cg_postprocess_unreal_2.png)

---

## Différences et Optimisations

En résumé, Unity demande une approche plus manuelle via HLSL et les Renderer Features pour optimiser le rendu, tandis qu’Unreal Engine propose une intégration spatiale plus directe via les Post Process Volumes, gérant automatiquement la géométrie de l'écran.

Ce sera tout pour ce shader mais on pourrait aller plus loin en intégrant des **LUTs (Look-Up Tables)**.
Avec cela, on pourrait directement importer des profils de couleurs depuis des logiciels de montage ou de photographie pour une meilleure précision artistique.

En somme, le Color Grading est un outil puissant qui peut transformer radicalement la perception d'un jeu. En comprenant comment manipuler la luminance et le contraste mathématiquement, on peut créer une véritable identité visuelle unique pour un jeu.

![Comparaison : Rendu Classique vs Rendu Color Gradé](resources/visuels/posts/colorgrading/cg_result.png)