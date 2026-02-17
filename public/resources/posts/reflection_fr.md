# Utiliser la réflexion pour produire du code dynamiquement.

Aujourd’hui, la plupart des jeux existants possède un élément d’IU (interface utilisateur) affichant une valeur une statistique ou une quantité, ou encore autre chose. 

![Exemple d’IU utilisées pour afficher des informations comme des valeurs au joueur. À gauche DigimonSurvive (Bandai Namco Ltd. / HYDE), à droite Mario Tennis Aces (Nintendo / Camelot Software Planning.](resources/visuels/posts/reflection/Post_Reflexion_A.jpg)

De la même manière, n’importe qui développant un jeu est amené à réaliser cela, et même si c’est une tâche simple, elle devient vite redondante, surtout quand on a énormément de valeurs à afficher. 

Suite à cette réflexion, j’ai décidé de programmer un outil me permettant de simplement sélectionner un élément d’IU, une valeur, et de relier les deux, le tout en 2 minutes maximum. J’ai donc commencé à imaginer mon plugin UnityBindedGraphics qui va s’appuyer sur les méthodes que propose la réflexion afin d’atteindre les objectifs escomptés. 

![Bannière du plugin UnityBindedGraphics.](resources/visuels/UBGVisuel.jpg)

> **Important** : Afin de clarifier la suite du post, le but est de présenter une approche simple et concrète des capacités de la réflexion dans la création de code dynamique au travers de mon plugin UnityBindedGraphics (UBG).
 Ce post n’a donc pas pour but de vous apprendre à manier la réflexion dans son intégralité mais de vous ouvrir une porte vers ce qu’elle peut faire et vous proposez, notamment dans le framwork .NET ! 

## Qu’est-ce que la réflexion ? 

La réflexion est un système permettant à une application de pouvoir modifier la conception ou le comportement d'un autre programme. Le programme réfléxive a la capacité de modifier les données d'un autre programme ou ses propres données, de les examiner ou encore d’effectuer des opérations dynamiques avec ses données. Concernant la réflexion dans .NET, je vous invite à lire cette page : 

La réflexion a clairement des avantages qui ne sont pas négligeables :
- Elle offre une meilleure maniabilité d’un code grâce à des conteneurs de métadonnées.
- Elle permet d’interagir dynamiquement avec une classe (création, modification et appel) sans avoir besoin de connaître le type ou de posséder un accès direct à la classe (via une instance par exemple). 

Ce sont ses qualités qui font que la réflexion est un outil aussi important dans des tas d’application, dont les moteurs de jeux comme l’Unreal Engine et Unity. La réflexion est au cœur de plusieurs concepts dans les moteurs de jeux comme les systèmes de sauvegarde et de chargement de données. 

Néanmoins, la réflexion entraîne des problèmes qui peuvent être fastidieux à régler, nous reviendrons dessus un peu plus tard. 

## Setup du plugin 

Maintenant que nous savons l’utilité de la réflexion dans le plugin, il est temps d’établir un plan. On va aussi poser des contraintes afin d’assurer le bon fonctionnement du plugin et simplifier son développement : 

- Étant donné qu'il nous faut une valeur, il est logique qu’on traite seulement les membres d’une classe qui peuvent retourner une valeur.
- Concernant les méthodes, seuls celles ne contenant pas d’argument seront proposés dans l’éditeur afin de simplifier le fonctionnement de l’outil.
- Nous allons par contre prendre en compte aussi bien les méthodes publics que les méthodes privates ou encore les méthodes propres à des classes parents. 

> **Important** : L'intégralité des extraits de code présentés ont été développés sous Unity en C#.
  Le C++ natif ne propose pas de système de réflexion au moment où j’écris cet article néanmoins, la partie théorique abordé dans ce post est commune à l’ensemble des langages de programmation et peut donc vous être utiles ! 

Tout est en place, on peut commencer le développement du plugin. Comme la réflexion est accessible depuis la bibliothèque System.Reflection en C# natif, nous n’avons pas besoin d’importer le moindre fichier sur Unity.

## L’accès aux données d’une classe par réflexion 

Une fois le comportement attendu de l’application mis au clair, on peut commencer la première étape du plugin : proposer à l’utilisateur les valeurs qu’il peut relier à un élément d’IU. Pour cela, j’ai programmé un éditeur custom où le joueur peut donner un composant MonoBehaviour et reçoit en retour une liste de valeur qu’il peut afficher, la valeur sélectionnée sera donc la valeur affichée au lancement du jeu. 

Pour récupérer la liste des valeurs pouvant être affichés, on va inspecter chaque membre propriétés et méthodes de la classe et vérifier qu’ils respectent les contraintes évoquées précédemment. Avec la réflexion, voici comment on procède :

1. On récupère le type du composant passé en paramètre dans l’éditeur personnalisé avec la méthode d’extension GetType() qui retourne le type de la classe et toutes les métadonnées liées à cette classe.
2. Depuis le type, on peut appeler GetMethods(BindingsFlags) qui va nous retourner une liste de méthodes présentes dans le type de données qui fait l’appel. Les BindingsFlags sont une énumération nous permettant de filtrer quelles méthodes on souhaite récupérer (méthodes public, private etc).
3. On applique le même principe pour les propriétés avec GetProperties(BindingsFlags).
4. On peut ensuite afficher les valeurs disponibles à partir de leur nom via la variable name.

```csharp
MemberInfo[] SelectAvailableMethods()
{ 
    Type _currentType = mbRef.objectReferenceValue.GetType(); 
    IEnumerable<MemberInfo> _memberInfos = new List<MemberInfo>(); 
    while (_currentType != null) 
    { 
        _memberInfos = _memberInfos.Concat(SelectAvailableMembers(_currentType.GetMethods, IsValidMethod, ReflectionUtils.AllBindings)); 
        _currentType = _currentType.BaseType; 
    } 

    return _memberInfos.ToArray(); 
} 

IEnumerable<MemberInfo> SelectAvailableMembers<TMemberInfo>(Func<BindingFlags, TMemberInfo[]> _callbackGetBindings, 
Func<TMemberInfo, bool> _callbackIsValid, BindingFlags _flags) 
where TMemberInfo : MemberInfo 
{ 
    if (_callbackGetBindings == null || _callbackIsValid == null) 
        return null; 

    TMemberInfo[] _bindings = _callbackGetBindings.Invoke(_flags); 
    return _bindings.Where(_member => _callbackIsValid.Invoke(_member)).ToArray(); 
}
```

> **Important** : Il est important de noter que comme pour la classe Type qui contient toutes les métadonnées d’un type donnée, il existe des conteneurs de métadonnées pour chaque type de membre : FieldInfo, PropertyInfo, MethodInfo etc.
 La classe mère de conteneurs de métadonnées d’un membre est MemberInfo : 

Pour simplifier l’affichage des valeurs disponibles, je regroupe les PropertyInfo et les MethodInfo sous la classe MemberInfo, on obtient ainsi le résultat suivant :

![Les valeurs que nous avons obtenues sont affichés par leur nom dans la liste déroulante “Member to bind”.](resources/visuels/posts/reflection/Post_Reflexion_B.png)

## Appeler dynamiquement une méthode avec la réflexion 

À ce stade, on a un éditeur personnalisé qui utilise la réflexion pour récupérer des valeurs valides à donner à notre IU. On peut donc aborder la deuxième étape du projet : relier la valeur à notre élément d’IU au lancement du jeu.

Si on veut, on peut faire cela très simplement avec la méthode Invoke(object, object[]) de la classe MethodInfo. Cette méthode permet d’exécuter n’importe quelle fonction sans connaître son type, on a juste à lui fournir l’instance qui appelle cette méthode étant donné et le tour est joué

Voilà donc les étapes :
1. On obtient notre conteneur de métadonnées sous la forme d’un MemberInfo.
2. On en extrait la méthode qui retourne notre value à afficher, c’est-à-dire la méthode en elle-même s’il s’agit d’une classe MethodInfo, sinon la GetMethod pour un PropertyInfo
3. On exécute la méthode de retour via Invoke et on affiche la valeur dans l’IU.

Si notre élément d’IU est un texte, le rendu final serait :

```csharp
MethodInfo _method = ReflectionUtils.ExtractGetMethod(memberValue);
if (_method != null)
    refTxt.text = _method.Invoke(monoBehaviourReference, null).ToString();
```

> **Important** : ExtractGetMethod et la classe statique ReflectionUtils sont des petits utilitaires que j’ai développés et n’appartienne donc pas à la bibliothèque System.Reflection.
 Le fonctionnement d’ExtractGetMethod n’est pas pour autant compliqué, il s’agit d’une simple vérification de cast valide et le cas échéant, j’extrais la méthode qu’il me faut comme indiqué précédemment. 

Comme on peut le constater, il est très simple d’appeler une méthode dynamiquement par réflexion, seulement dans le cas d’UnityBindedGraphics qui risque d’avoir simultanément plusieurs UI relié à une valeur et des mises à jour régulières de la valeur, c’est mauvais pour les performances. 

## Les défauts de la réflexion 

On revient sur les défauts de la réflexion comme je l’avais évoqué plus haut. En fait, le plus gros défaut de la réflexion est en même temps ce qui fait sa force : le type de données avec lequel on interagit est inconnu à la compilation. 

Cette particularité de ce système est aussi sa faiblesse car cela apporte des nouvelles problématiques qu’on rencontre moins souvent en temps normal :
- La réflexion nécessite plus de sécurité lors du traitement d’une donnée puisqu’on ne sait pas avec quel type on travaille et ce qu’on peut faire avec
- L’appel de méthodes via la réflexion nécessite de déterminer la méthode et le type déclarant la méthode ainsi que celui de l’objet “instigateur” de l’invocation, sans compter les arguments qui sont inconnus, bref il faut tout déterminer à l’exécution.
- La réflexion favorise le boxing et l’unboxing de valeurs
- Le compilateur ne peut effectuer que très peu d’optimisation et de vérification sur l’appel de la méthode 

> **Important** : Le boxing et l’unboxing sont une conversion d’un type valeur comme int en un type object ou en type interface qu’implémente le type valeur en question.
Ce sont des opérations de conversions coûteuses et qui nécessite d’allouer de la mémoire pour une nouvelle instance d’objet dans le tas, retrouvez-plus d’information sur le boxing / l’unboxing 

En prenant tout ça en compte, ça devient vite un chantier aussi bien pour nous que pour le compilateur de travailler avec le système de réflexion. C’est pour ça que nous allons utiliser un delegate pour stocker la méthode qui renvoie la valeur et ainsi l’appeler sans avoir recours à la réflexion. 

Mais deux soucis se posent, c’est l’utilisateur qui détermine le type de notre valeur et il faut créer ce delegate au lancement du jeu, on va donc chercher d’abord à pouvoir créer dynamiquement notre méthode qui va créer le delegate, puis on verra ensuite comment crée dynamiquement ce delegate. 

## Créer dynamiquement une méthode générique avec la réflexion 

Pour permettre à l'utilisateur du plugin de personnaliser le comportement du delegate, nous allons créer une interface IRefValueWrapper et une classe générique RefValueContainer<TValueType> qui vont contenir ce delegate. 

```csharp
public interface IRefValueWrapper
{
    object GetGetterValue();
}

internal class RefValueContainer<TRefGetterType> : IRefValueWrapper
{
    Func<TRefGetterType> refGetterValue = null;

    public RefValueContainer(Func<TRefGetterType> _refGetterValue)
    {
        refGetterValue = _refGetterValue;
    }

    public object GetGetterValue() => refGetterValue.Invoke();
}
```

Maintenant revenons sur le premier problème de cette approche : c’est l’utilisateur qui détermine le type de notre valeur. En imaginant que notre valeur est de type int, il faudrait donc qu’on puisse faire dynamiquement l’instruction suivante : 

```csharp
Func<int> action = null;
int ReturnValue() => 0;
void CreateDelegate() => action += ReturnValue;
```

Pour cela, la réflexion va nous aider à nouveau, il existe dans la bibliothèque System.Reflection une fonction MakeGenericMethod(Type[]). Cette méthode appartient à la classe MethodInfo et prend un tableau de Type en paramètres afin de retourner un nouveau MethodInfo, avec la même définition que le MethodInfo instigateur mais avec les types souhaités en paramètre. Voilà un exemple bien plus parlant en supposant que notre valeur est de type int : 

```csharp
void GenericMethod<TValueType>()
{
    Debug.Log($"Generic argument of GenericMethod is {typeof(TValueType)}");
}

void CreateIntMethod()
{
    // We get our generic method called "GenericMethod",
    // then we create a new method that take an int based on this generic method.
    MethodInfo _genericMethod = GetType().GetMethod("GenericMethod", BindingFlags.Instance | BindingFlags.NonPublic);
    MethodInfo _newIntMethod = _genericMethod?.MakeGenericMethod(new Type[] { typeof(int) });
}
```

> **Important** : Même si MakeGenericMethod(Type[]) est une fonction très puissante, elle peut facilement causer une exception du fait qu’on crée une méthode générique dynamiquement et qui est totalement inconnu au compilateur, faîtes donc attention à bien sécuriser votre code quand vous faîtes appel à cette fonction. 

On a désormais un moyen de créer dynamiquement notre méthode générique qui va passer au delegate le type de la valeur, il ne nous reste plus qu’à trouver un moyen de créer dynamiquement notre delegate. 

> **Important** : Il est important de noter qu’il existe aussi une autre fonction permettant de créer un type depuis une définition générique, on pourrait par exemple créer une List<int> depuis List<T0> avec cette méthode. Pour en savoir plus : 

## Créer dynamiquement un delegate avec la réflexion 

On approche du but, il faut trouver un moyen de créer dynamiquement notre delegate. 

Si on fouille la documentation de System.Reflection, on peut trouver la fonction CreateDelegate : 

Il existe plusieurs surcharges de cette méthode mais on va utiliser celle-ci parce que la méthode que nous allons relier une méthode instanciée. 

> **Important** : Nous n’allons traiter que les méthodes instanciées dans notre cas puisque nous avons une référence vers le composant possédant la méthode qui renvoi la valeur.
 Néanmoins, sachez qu’il est possible de créer des delegates pour des méthodes statiques également. 

Maintenant qu’on a une solution pour chacun de nos problèmes, on peut proposer une solution pour mettre à jour notre IU lorsque notre valeur change dynamiquement, volà le résultat : 

```csharp
void InitGetterValueBinding()
{
    // Extract getter method and value’s type of the MemberInfo.
    MethodInfo _methodInfo = ReflectionUtils.ExtractGetMethod(memberValue);
    selectedType = ReflectionUtils.ExtractType(memberValue);

    // Make a new generic method with the specific selected type based on 
    // CreateRefValueWrapper method.
    MethodInfo _createRefValueMethod = typeof(BindedGraphic).GetMethod(CREATE_REF_VALUE_WRAPPER, ReflectionUtils.AllBindings);
    MethodInfo _genericCreateRefValueMethod = _createRefValueMethod.MakeGenericMethod(new Type[] { selectedType });

    // Finally, bind the get method to the IRefValueWrapper through
    // the customized method CreateRefValueWrapper.
    object _wrapper = _genericCreateRefValueMethod.Invoke(this, new object[] { monoBehaviourReference, _methodInfo });
    wrapper = (IRefValueWrapper)_wrapper;
}

IRefValueWrapper CreateRefValueWrapper<TRefGetterType>(MonoBehaviour 
_refValue, MethodInfo _methodInfo)
{
    if (_refValue == null || _methodInfo == null)
        throw new BindedGraphicException(BindedGraphicExceptionID.REFERENCE_WRAPPER_CREATION);

    Func<TRefGetterType> _refGetterType = (Func<TRefGetterType>)Delegate.CreateDelegate(typeof(Func<TRefGetterType>), _refValue, _methodInfo);
    return new RefValueContainer<TRefGetterType>(_refGetterType);
}
```

> **Important** : Ici, memberValue correspond à notre MemberInfo récupéré plutôt et selectedType est le type de la valeur que l’on souhaite afficher. 

Afin de laisser le choix à l’utilisateur sur comment mettre à jour la valeur dans l’IU, nous allons proposer la mise à jour par la méthode Update d’Unity ou via un delegate qui sera lui aussi crée dynamiquement (de la même manière que dans l’exemple juste au-dessus). 

Enfin, nous avons fini, le plugin nous permet de sélectionner une valeur à afficher, puis en jeu, il gère dynamiquement l’affichage de notre valeur dans l’IU. Notre nouvelle solution permet de faire des updates qui prennent 0.004ms allant à 0.012ms en fonction du type d’IU, ce qui est franchement pas mal. 

C'est ici que se conclut ce post. La réflexion permet de manipuler en profondeur les types et je pense que cet article vous a montré les bases pour faire beaucoup d'outils sympa avec. Peut-être même que la réflexion vous a inspiré à créer de nouveaux outils ?
