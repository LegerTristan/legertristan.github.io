# Rendre de la lave fluide et organique via la manipulation d'UV

![GIF de la lave en mouvement](resources/videos/UVManipulation.gif)
*Rendu final : Scrolling, distorsion et displacement combinés.*

Après avoir exploré les bases un shader d'émission, j'ai décidé de m'attaquer à un pilier fondamental du Technical Art : **la manipulation des UVs**.

L'objectif de ce projet était de transformer une texture de lave totalement statique en un fluide organique et visqueux, uniquement via le shader, sans aucune simulation physique ou animation pré-calculée. Pour cela, on va utiliser les coordonnées de texture et des mathématiques simples pour créer l'illusion du mouvement.

---

## 1. Qu'est-ce que sont les UVs ?

Je vais commencer par expliquer ce que sont les UVs : il s'agit des coordonnées qui permettent de projeter une image 2D comme une texture sur la surface d'un objet 3D, comme un cube par exemple. 
*   **U** représente l'axe horizontal, et il va de 0 à 1.
*   **V** représente l'axe vertical, allant lui aussi de 0 à 1.

> Chaque moteur a sa propre origine : **Unity** place le point (0,0) en bas à gauche (V pointe vers le haut), tandis qu'**Unreal Engine** le place en haut à gauche (V pointe vers le bas). 

Sans ces coordonnées, le GPU ne saurait pas quel "pixel" de la texture afficher sur chaque "point" du mesh. En manipulant ces deux valeurs avant qu'ils n'atteignent l'échantillonnage de la texture, plus communément appelé le sampling, on peut déplacer, déformer ou tordre l'image à volonté en bidouillant ces UVs.

> Les "pixels" de la texture s'appellent des **texels** (Texture Elements). La différence est simple : un **pixel** est le point de couleur final affiché sur votre écran, tandis qu'un **texel** est l'unité de base d'une texture stockée en mémoire. Lorsque vous zoomez sur un objet, un seul texel peut finir par couvrir plusieurs dizaines de pixels à l'écran.

Pour appliquer une quelconque déformation sur des UVs, il faut pour cela appliquer une opération. Il y a deux grands types d'opérations qui sont à la base de ce que je vais présenter après : 

- **L'addition** qui permet de réaliser un **offset**, c'est-à-dire un décalage de l'UV. Si on prenait une texture avec un cercle blanc centré sur fond noir, décaler les UVs reviendrait à décaler le cercle et le décentrer de la texture. 
- **La multiplication**, elle permet de changer le **tiling**. C'est tout simplement la répétition de la texture : si je multiplie par 2 mes coordonnées UV, la texture va apparaître deux fois (en boucle) sur la même face d'un cube. Si je la multiplie par 0.5, seule la moitié de la texture sera visible, étirée sur toute la face. 

> Évidemment, si l'addition et la multiplication fonctionne, il en va de même pour la soustraction etr la division, ce sont que les opérations inverses après tout.

![Exemple d'offset et de tiling](resources/visuels/posts/uvmanipulation/uv_example.jpg)

---

## 2. Le Scrolling 

Le **Scrolling** (ou défilement) est la méthode la plus directe pour animer une surface. Même si le rendu reste très mécanique, c'est de loin le plus simple à implémenter. 

**La logique mathématique est la suivante :** 
*   **L'offset :** Comme indiqué avant, on va ajouter une valeur aux UV pour décaler la texture. 
*   **Le temps :** Cette valeur qu'on va ajouter est le temps écoulé depuis le lancement du jeu pour rendre le décalage continu.
*   **La vitesse :** Pour finir, on multiplie le temps par un vecteur de vitesse pour contrôler la direction et la rapidité du flux.

```hlsl
// Calcul de l'UV décalé par le temps et la vitesse
float2 scrolledUV = uv + (_Time.y * _ScrollSpeed.xy);
float4 texColor = tex2D(_MainTex, scrolledUV);
```
*Extrait du Fragment Shader : Application du scrolling sur la texture principale.*

![Scrolling fait en BP dans Unreal](resources/visuels/posts/uvmanipulation/ue_nodes_scrolling.png)

| Moteur | Outil de Scrolling | Logique |
| :--- | :--- | :--- |
| **Unity** | `_Time.y` | Addition manuelle à l'UV |
| **Unreal Engine** | Node **Panner** | Composant nodal intégré |

---

## 3. La Distorsion (UV Warping)

Faire défiler une texture en ligne droite reste prévisible. Pour obtenir l'aspect imprévisible de la lave, j'utilise la **Distorsion** avec un bruit de perlin (Perlin Noise).

> Un **bruit de Perlin** est une fonction mathématique qui génère une texture procédurale "nuageuse". C'est idéal pour simuler des phénomènes naturels comme des nuages, de la fumée ou, dans notre cas, la viscosité d'un fluide.


Comme le bruit de perlin donne une valeur comprise entre 0 et 1, on va s'en servir pour décaler la texture et donc la troubler.

**Voici les étapes pour réaliser cela :**
*   **Échantillonnage du bruit :** On récupère la valeur du bruit via une texture de masque qui défile elle aussi (souvent à une vitesse différente de la lave).
*   **Le centrage :** Comme le bruit est compris entre `[0, 1]`, on ne peut décaler la texture que dans un sens (vers le haut/droite). Pour corriger cela, on soustrait 0.5 à la valeur du bruit, ce qui donne une plage `[-0.5, 0.5]`. Cela permet à la distorsion de pousser les pixels de la lave aussi bien vers la gauche que vers la droite, ou vers le haut et le bas.

Voilà un exemple concret sur Unity et Unreal :

```hlsl
#ifdef _DISTORTION_ON
    float2 noiseUV = v2f.uv + (_Time.y * _NoiseScrollSpeed.xy); 
    float distortion = tex2D(_PerlinNoiseTexture, noiseUV).r; 

    // On applique le décalage chaotique aux UVs de base
    distortedUV = v2f.uv + (distortion - 0.5) * _DistortionStrength;
#endif
```
![Distorsion fait en BP dans Unreal](resources/visuels/posts/uvmanipulation/ue_nodes_distorsion.png)

---

## 4. Le Displacement (Vertex Displacement)

Maintenant que la lave donne une illusion de mouvement, il faudrait lui ajouter de la profondeur. Il faut modifier la géométrie du mesh et pour cela, on va utiliser la **tessellation**. 

> La **tessellation** est une technique qui consiste à subdiviser dynamiquement les polygones d'un mesh en triangles plus petits. En augmentant ainsi la densité de points du modèle 3D, on permet au shader de "sculpter" des détails bien plus fins que ce que le modèle original permettait.

> Une **height map** (carte de hauteur) est une texture en niveaux de gris où chaque texel représente une altitude : le noir correspond au point le plus bas (0) et le blanc au point le plus haut (1).

> Les **normales** sont des vecteurs perpendiculaires à la surface d'un mesh. Elles indiquent au shader dans quelle direction "regarde" une face ou un sommet.

![Visualisation des normales d'un mesh](resources/visuels/posts/uvmanipulation/uvmanipulation_normals.png)
*Les normales sont représentés par les flèches bleus. Cette image provient du site [https://www.numerical-tours.com/matlab/meshproc_2_basics_3d/](https://www.numerical-tours.com/matlab/meshproc_2_basics_3d/)* 

> À noter qu'il existe d'autres moyens de déplacer des vertices, notamment via le **World Position Offset (WPO)** dans Unreal ou la manipulation du `v.vertex` dans Unity.

**Les étapes du displacement sont les suivantes :**
*   On commence par récupérer la valeur de la **Height Map** via l'échantillonage habituel.
*   On multiplie ensuite cette valeur par la **Normale** du sommet, c'est-à-dire la direction vers laquelle pointe la face.
*   On additionne ce résultat à la position d'origine du sommet : `Position Finale = Position + (Normale * Hauteur)`.

Le setup de la tesselation dans Unity et Unreal ne se gère pas du tout de la même manière.
La **tessellation Hardware** (Unity) utilise des étapes spécifiques du GPU (Hull/Domain Shaders) pour diviser les triangles, alors que la **tessellation Software** (comme avec Nanite dans Unreal) repose sur des algorithmes de rendu plus modernes et flexibles.

*   **Unity :** Étant donné qu'il s'agit d'un changement au niveau des vertices et non de la couleur du pixel, il faut travailler dans le **vertex shader**. On utilise `tex2Dlod` au lieu de `tex2D` aussi pour déplacer les points. Cela demande aussi un mesh très subdivisé dû à la tesselation "hardware".

*   **Unreal Engine :** Depuis l'UE 5.3, la tessellation classique a été remplacée par la **Nanite Tessellation**. On l'active dans les paramètres du static mesh et du matériau en cochant "Enable Displacement Map". C'est Nanite qui gère alors l'ajout de millions de triangles à la volée.

```hlsl
#ifdef _DISPLACEMENT_ON
    float heightMap = tex2Dlod(_DisplacementMask, float4(scrolledUV, 0, 0)).r;
    float displacement = heightMap * _DisplacementStrength;

    // Déplacement réel des sommets dans l'espace
    finalPos += input.vertexNormal.xyz * displacement;
#endif
```
*Exemple de displacement dans un shader HLSL sur Unity*

![Setup de la Tesselation dans Unreal](resources/visuels/posts/uvmanipulation/ue_nodes_tesselation.png)

---

## 5. Résultat et axes d'améliorations

Pour le rendu final, j'ai réutilisé les principes d'émission et de masquage abordés dans mon projet précédent pour faire briller les zones de magma intense.

![Comparaison entre lave statique et dynamique](resources/videos/UVManipulation_UnrealResult.gif)
*À gauche : texture simple. À droite : shader complet avec relief et émission.*

### Axes d'améliorations :

Voici quelques idées que je n'ai pas intégré mais qui aurait clairement aidé à améliorer le rendu de la lave.

*   **Fractal Distortion (Domain Warping) :** Une technique avancée consistant à utiliser un premier bruit pour distordre les UVs d'un second bruit. On utilise ensuite ce second bruit pour distordre la lave. Cela crée des formes tourbillonnantes beaucoup plus complexes et organiques, idéales pour de la fumée ou des fluides très visqueux.
*   **Flow Maps :** Au lieu d'un scrolling linéaire, on peut recourir à une texture de vecteurs pour diriger la lave autour des obstacles du décor.

Voilà qui conclut ce chapitre sur la manipulation des UVs. Elle permet de donner vie à un décor inerte avec un coût de performance minimal. 
De mon côté, ce projet m'a permis de poser les bases nécessaires avant de m'attaquer à mon prochain défi : le Post-process et le Color Grading !