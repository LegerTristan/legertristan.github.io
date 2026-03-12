# Crée un effet de scan à partir d'un shader d'émission avec masquage

![Vidéo du rendu final](resources/videos/DynamicMaskEmission.gif)

Cette année, j'ai décidé de plonger sérieusement dans l'univers des shaders pour les maîtriser. Pour débuter cet apprentissage, mon choix s'est porté sur un shader d'émission. C'est un premier projet idéal, car il est plus simple à développer et ne nécessite pas de calculs de lumières complexes pour offrir un résultat visuel immédiat.



## Qu’est-ce qu’un shader ?

Chaque moteur possède ses particularités pour créer des shaders. Afin d'être sûr de comprendre chaque étape d'un rendu et pas seulement de savoir le copier, j'ai souhaité réaliser ce shader de deux façons différentes :

- **L'utilisation du Material Editor d'Unreal Engine**, un outil nodal généralement plus intuitif et simple.
- **L'écriture de code HLSL via ShaderLabs dans Unity**. Le but étant d'avoir une meilleure compréhension mathématique du rendu et d'apprendre à traiter les informations qui sont souvent gérées par défaut par les approches nodales.

> **Important** : Dans Unity, il existe aussi une solution nodale : le Shader Graph. Au-delà du fait que je l'estime moins performante que le Material Editor d'Unreal, il n'y a tout simplement pas de solution simple pour programmer en HLSL pur sur Unreal Engine ; ma seule option était donc de réaliser cela sur Unity.



## L'approche Unreal et Unity

Chaque moteur possède ses particularités pour créer des shaders. Afin d'être sûr de comprendre chaque étape d'un rendu et pas seulement savoir le recopier, j'ai souhaité réaliser chaque shader de deux façons différentes :
- **Utiliser le Material Editor d'Unreal Engine**, un outil nodal et généralement plus intuitif et simple.
- **Écrire le code HLSL via ShaderLabs dans Unity**. Le but étant d'avoir une meilleure compréhension mathématique du rendu et aussi pour apprendre à traiter les informations qui sont souvent gérés par défaut par les approches nodales.

> **Précision** : Dans Unity aussi il existe une solution nodale, le Shader Graph. Au delà du fait que j'estime qu'elle est moins performante que le material editor d'Unreal, il n'y a tout simplement pas de solutions simple pour programmer en HLSL sur Unreal Engine, donc ma seule option était de réaliser cela sur Unity.



## Comment transformer un simple shader d'émission en un effet de scanner ? 

L'effet de scan est un classique du jeu vidéo : chacun a sa vision du scan et, bien que le rendu final semble complexe, sa structure repose sur des piliers mathématiques simples. 
Dans mon cas, je l'ai imaginé comme une ligne surbrillante et relativement fine qui monte le long du corps du personnage avec une couleur intense. 

> **Précision** : Étant donné qu'il s'agit d'un premier shader, je ne vais pas prendre en compte la gestion de la lumière pour simplifier le code. Cela aura un impact sur la différence de rendu entre Unity et Unreal, car le Material Editor d'Unreal gère déjà certaines informations de lumière nativement, contrairement au ShaderLabs d'Unity.



## Étape 1 : L'émission

Avant toute chose, il faut appliquer cette surbrillance caractéristique sur le personnage. Pour cela, on définit la teinte de l'émission et une intensité qui va nous permettre de renforcer cet éclat.

Nous commençons par multiplier la teinte par l'intensité pour renforcer la luminance. Ensuite, pour que cette teinte s'applique sur la texture actuelle du personnage, nous l'ajoutons à l'Albedo. Pour que le résultat soit réellement émissif, il faut définir une intensité supérieure à 1.0.

```hlsl
float3 emission = _EmissionTint.rgb * _EmissionIntensity;
return float4(texColor.rgb + emission, texColor.a);
```
*Code HLSL pour appliquer l'émission sur le personnage.*

> **Note** : Pour simplifier la rédaction de ces posts, je ne posterai que le code HLSL de chaque partie.

On obtient ainsi notre halo lumineux caractéristique. Nous verrons par la suite comment ajouter le Bloom pour renforcer cet effet, en attendant, laissons-le ainsi.

![Rendu actuel avec l'émission.](resources/visuels/posts/dynamicmaskemission/dme_emission.jpg)

> **Aparté** : Le calcul de l'émission diffère selon les moteurs. Unreal utilise une multiplication linéaire (`Color * Intensity`). Unity utilise souvent une logique logarithmique (`Color * pow(2, Intensity)`), similaire au fonctionnement des "stops" en photographie. Pour en savoir plus sur les stops, je vous invite à consulter ce lien : [https://en.wikipedia.org/wiki/Exposure_value](https://en.wikipedia.org/wiki/Exposure_value).



## Étape 2 : Le masque

Pour obtenir une ligne de scan, on utilise le **masquage**. Le masquage consiste à utiliser une valeur comprise entre 0 et 1 pour définir la visibilité d'un élément (une couleur ou une texture). Généralement, 0 signifie invisible et 1 signifie visible.

Grâce à cela, au lieu d'illuminer tout le corps, on ne met en surbrillance qu'une partie précise. Pour choisir cette zone, on récupère la position locale du personnage sur l'axe vertical (Y), ce qui correspond généralement au niveau des pieds. Ensuite, en utilisant un exposant, on affine cette sélection pour ne garder qu'une bande très fine.

```hlsl
float maskValue = pow(max(v2f.localPos.y, 0), _ScanSharpness);
// ...
float3 emission = _EmissionTint.rgb * _EmissionIntensity * maskValue;
return float4(texColor.rgb + emission, texColor.a);
```
*Code HLSL pour n'afficher qu'une bande d'émission au niveau des pieds.*

On obtient ainsi une ligne fixe au niveau des pieds du personnage.

![Rendu actuel avec le masquage.](resources/visuels/posts/dynamicmaskemission/dme_mask.jpg)
*Si vous ne voyez pas la bande sur les pieds du personnage, ne vous inquiétez pas. Elle est souvent située juste en dessous du mesh dans ce genre de cas. En la faisant bouger lors de la prochaine étape, elle apparaîtra sans aucun doute.*

> **Important** : Il est également possible d'utiliser une texture en noir et blanc comme masque si l'on souhaite des formes de scan plus spécifiques ou organiques. C'est même généralement plus performant que de calculer soi-même le masque mathématiquement.




## Étape 3 : Le scrolling UV

Pour que la ligne se déplace, on injecte la variable de **Temps** (`_Time`) dans le shader. Elle nous permet de faire défiler le masque le long du corps. Cependant, pour le moment, le masque ne revient jamais au niveau des pieds une fois la tête atteinte. 

Pour gérer cela, on utilise la fonction **sinus (sin)**. Comme cette fonction oscille entre -1 et 1, elle permet de répéter le mouvement de haut en bas de manière cyclique. 

```hlsl
// _ScanFrequency permet d'ajouter plus de lignes si on le souhaite.
float scan = sin((v2f.localPos.y * _ScanFrequency) - (_ScrollSpeed.x * _Time.y));
maskValue = pow(max(scan, 0), _ScanSharpness);
// ...
float3 emission = _EmissionTint.rgb * _EmissionIntensity * maskValue;
return float4(texColor.rgb + emission, texColor.a);
```
*Code HLSL pour ajouter le déplacement cyclique de la ligne.*

En combinant le temps et le sinus, on obtient un déplacement fluide et perpétuel de la ligne de scan.

![Vidéo du rendu final](resources/videos/DynamicMaskEmission_Scan.gif)

> **Note** : Je ne vais pas rentrer dans le détail concernant les UV car cela sera le sujet de mon prochain projet de shader.



## Étape 4 : Setup de la scène

L'émission seule ne suffit pas à faire "briller" l'objet à l'écran. Il est impératif d'ajouter un effet de **Post-Process : le Bloom**.
Le Bloom détecte les zones dont l'intensité dépasse 1.0 (HDR) et les fait s'étendre sur les pixels voisins pour simuler un éblouissement.

- **Pour l'activer dans Unity** : Il faut s'assurer que le projet utilise URP ou HDRP, puis ajouter un composant `Global Volume`. Enfin, il faut configurer l'effet Bloom et s'assurer que le HDR est activé sur la caméra.
- **Pour l'activer dans Unreal** : Il est activé par défaut, mais il est possible de le personnaliser en ajoutant un `Post Process Volume` dans votre scène et en modifiant les paramètres de la catégorie `Bloom`.



## Conclusion

Ce shader d'émission dynamique est une base indispensable à mes yeux avant d'attaquer des effets plus complexes comme la dissolution ou les hologrammes. Ce projet a été l'occasion pour moi de transformer un matériau statique en un effet visuel sympa en manipulant simplement le temps, les masques et l'intensité.

J'espère que le sujet vous aura plu. Merci pour votre attention et n'hésitez pas à me contacter sur LinkedIn pour en discuter !

![Vidéo du rendu final](resources/videos/DynamicMaskEmission.gif)