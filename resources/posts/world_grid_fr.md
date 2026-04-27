# WorldGrid Shader : Maîtriser l'échelle et les espaces

![GIF de la grille sur différentes formes](resources/videos/WorldGrid_Showcase.gif)
*Rendu final : Une grille procédurale adaptative avec relief et coins arrondis.*

Après m'être inité aux shaders post-process, je poursuis ma roadmap Technical Art en m'attaquant à un outil indispensable du développement de jeux : le **WorldGrid Shader**.

## Pourquoi un Grid Shader ?

C’est un des outils favoris des Game Designers et Level Designers lors des phases de prototypage.    
Il a deux intérêts :

1.  **Visualiser l'échelle :** Une grille d'un mètre permet de se rendre compte instantanément de la taille d'une pièce ou de la hauteur d'un saut.
2.  **Ne pas dépendre des UVs :** Contrairement à une texture classique qui s'étire si on agrandit un cube, le WorldGrid reste fixe et aligné sur le monde, peu importe les transformations appliquées au mesh.

> **Note :** Dans notre cas, nous nous concentrerons sur la grille carrée. Mais il est tout à fait possible de réaliser des grilles différentes comme l'hexagonale (que l'on retrouve notamment dans la licence de jeu "Civilization").

Nous allons voir comment construire ce shader à travers 4 points clés, en passant d'une simple répétition à un système complet, adaptable pour du **World Space** ou du **Local Space**.

---


## 1. La fonction Frac : Le moteur de la répétition

Pour commencer, il faut produire la grille qui s'étend vers l'infini. Pour cela, il existe une fonction indispensable : `frac()`.   
Elle ne conserve que la partie décimale d'un nombre (ex: `frac(10.3) = 0.3`).

En appliquant cela aux coordonnées de position (X et Y), on force la valeur à revenir à 0 dès qu'elle atteint 1. On crée ainsi une cellule répétitive de 1x1 unité. Pour obtenir les bords de la grille, on récupère les composantes X et Y, et on utilise un `max()` pour ne garder que les contours.

```hlsl
// Unity HLSL : Isoler la cellule
float2 gridCell = frac(position / _GridSize);
gridCell = abs(gridCell - 0.5); // Centrage des coordonnées
```

![Noeuds Unreal Frac](resources/visuels/posts/worldgrid/ue_nodes_frac.png)
*Dans Unreal, il existe un noeud Frac qui fonctionne exactement de la même manière que la fonction.*

---

## 2. Step et SmoothStep : Définir les bords

Une fois nos coordonnées répétées, il faut définir l'épaisseur des lignes pour qu'elle soit bien visible ou discrète.   
Face à ce genre de problèmes, on a déjà vu la solution dans un ancien post , il existe deux fonctions pour délimiter : 

*   **Step :** Crée une coupure nette (0 ou 1). C'est efficace mais produit du crénelage (aliasing).
*   **SmoothStep :** Plus souvent utilisé car il fonctionne pareil que `step` et ajoute la possibilité de mettre en place une transition douce entre les deux valeurs. Il est donc parfait pour lisser les bords de notre grille et intégrer plus tard un paramètre de **Bevel**.

```hlsl
// Unity HLSL : Création du masque de ligne
float2 mask2D = smoothstep(0.5 - _LineThickness - _Bevel, 0.5 - _LineThickness, gridCell);
float gridMask = max(mask2D.x, mask2D.y);
```

![Nodes dans Unreal](resources/visuels/posts/worldgrid/ue_nodes_step.png)

> **Note :** Ici, j'utilise une variable "Bevel" car il me sert également plus tard dans la réalisation de rainures. Dans votre cas, vous pouvez totalement renommer la variable comme vous le souhaitez.

![Rendu grille simple Unity](resources/visuels/posts/worldgrid/render_grid.png)

---

## 3. Le Triplanar Mapping : L'anti-étirement

Si vous réalisez le shader en même temps, vous avez dû vous rendre compte de plusieurs problèmes. Par exemple, selon le moteur de jeu, le rendu de la grille est anormal sur n'importe quelle autre forme que le cube. De plus, à l'exception de la face supérieure et inférieure, les autres faces ont l'air étirées.

Cela est dû au fait que la grille est représentée uniquement sur un plan pour le moment or, notre scène est en 3D. Il faut donc adapter notre formule aux différents plans : on va donc utiliser le **Triplanar Mapping**.

Cette technique résout la plupart de nos problèmes en projetant la grille depuis les trois axes (X, Y, Z) simultanément. Cela revient donc à l'appliquer sur 3 plans à la fois.    
Ensuite, le shader calcule un "poids" pour chaque face en fonction de sa normale : si une face regarde vers le haut, on affiche la projection Y. Si elle regarde devant, on affiche la projection Z, etc.

> Je reviendrai plus en détail sur les mathématiques du Triplanar dans un post dédié, car c'est une notion assez complexe.   
> Pour le moment, je vais juste vous fournir un extrait de code simplifié pour que l'idée soit claire.   
> Je vous invite à vous renseigner de votre côté si vous voulez savoir exactement comment implémenter cette notion.

```hlsl
// Unity HLSL : Calcul des poids et mélange triplanaire
float3 weights = pow(abs(normalWS), 4);
weights /= (weights.x + weights.y + weights.z); // Normalisation de Manhattan

// Projections sur les 3 plans (YZ, XZ, XY)
float hX = GetGridHeight(pos.yz / _GridSize);
float hY = GetGridHeight(pos.xz / _GridSize);
float hZ = GetGridHeight(pos.xy / _GridSize);

// Mélange final
float finalH = (hX * weights.x) + (hY * weights.y) + (hZ * weights.z);
```

![Comparaison Triplanar Mapping](resources/visuels/posts/worldgrid/render_triplanar_mapping.jpg)
*À gauche : Triplanar Mapping (propre sur toutes les faces). À droite : projection simple (étirement). *

---

## 4. World Space vs Local Space

Par défaut, un World Grid Shader fonctionne en World Space. Si vous tournez votre cube, la grille ne tourne pas. C'est parfait pour des sols, mais problématique pour des objets mobiles (caisses, portes).

J'ai donc ajouté un mode **Local Space**. Celui-ci a évidemment un défaut comparé au World Space : la grille s'étire avec l'objet si on change son scale. Pour annuler cela, on récupère la taille réelle de l'objet dans le monde (`WorldScale`) et on multiplie la position locale par celle-ci. Ainsi, 1 unité de grille correspond toujours à 1 mètre dans le monde, même si le cube est étiré.

> **Important :** L'espace par défaut diffère selon les moteurs. **Unity** envoie les données de mesh en **Local Space** (Object Space) dans le vertex shader. Pour obtenir le World Space, il faut utiliser la matrice `unity_ObjectToWorld`. À l'inverse, le Material Editor d'**Unreal** est directement en **World Space**. Pour retrouver l'espace local, il faut utiliser le nœud `LocalPosition`.

Pour réaliser la conversion, on utilise des fonctions de transformation de vecteurs :
*   **Unity :** `TransformObjectToWorld(input.vertexPosition)` pour passer du local au monde.
*   **Unreal :** Le nœud **Transform** (Source: World Space, Destination: Local Space) pour faire l'inverse.

![Nodes Unreal Local Space](resources/visuels/posts/worldgrid/ue_nodes_localspace.png)

---

## Bonus 1 : Ajouter des "Corners" (SDF)

Pour arrondir les intersections de la grille, j'utilise la logique des **SDF (Signed Distance Fields)**. Un SDF est une fonction qui renvoie la distance entre un point et le bord d'une forme. En calculant la distance entre le centre de notre cellule et ses coins (0.5, 0.5) via la fonction `length()`, on peut générer des arrondis parfaits aux croisements des lignes.

```hlsl
// Unity HLSL : Masque de coin arrondi aux intersections
float2 gridCell = abs(frac(uv) - 0.5);
float distanceToCorner = length(0.5 - gridCell);
float cornerMask = 1.0 - smoothstep(finalRadius - _Bevel, finalRadius, distanceToCorner);
gridMask = max(gridMask, cornerMask);
```

![Noeuds Unreal Corner](resources/visuels/posts/worldgrid/ue_nodes_corner.png)

![Rendu coins arrondis](resources/visuels/posts/worldgrid/render_corner.jpg)

---

---

## Bonus 2 : Le Bevel (L'effet de rainure)

Pour donner de la profondeur à la grille sans ajouter de polygones, on simule un relief.   

*   **Dans Unity :** On échantillonne la hauteur de la grille au pixel actuel (`h`), puis un peu plus à droite (`hX`) et un peu plus haut (`hY`). La différence nous donne une pente, que l'on combine avec la normale de l'objet pour réagir à la lumière.

```hlsl
// Unity HLSL : Calcul de la pente pour le relief
float3 bump = float3(h - hX, h - hY, 0.01) * _BumpStrength;
float3 finalNormal = normalize(normalWS + bump);
```

*   **Dans Unreal :** En Deferred Rendering, on ne calcule pas la lumière soi-même. On utilise les **dérivées matérielles** via les nœuds **DDX** et **DDY**. En outre, ces noeuds fournissent la différence de valeur entre le pixel actuel et son voisin sur l'écran. 
Le nœud **PerturbNormalHQ** utilise ensuite ces dérivées pour "tordre" la normale du mesh instantanément. C'est extrêmement performant car cela évite de recalculer la fonction de grille plusieurs fois, ce qui est nécessaire dans la méthode utilisée sur Unity.

![Noeuds Unreal Bevel](resources/visuels/posts/worldgrid/ue_nodes_bevel.png)

![Rendu Bevel Unity](resources/visuels/posts/worldgrid/render_bevel.jpg)
*L'ajout du relief change radicalement la perception de l'objet, lui donnant un aspect "gravé".*

---

## Conclusion

Le WorldGrid Shader est un bon exemple de la manière dont des mathématiques simples (`frac`, `abs`, `dot`) peuvent résoudre des problèmes de production concrets. Ce projet m'a permis de solidifier ma compréhension des espaces de coordonnées, une étape cruciale avant d'attaquer des sujets plus artistiques.

![Image finale du Grid Shader](resources/visuels/posts/worldgrid/final_showcase.jpg)



