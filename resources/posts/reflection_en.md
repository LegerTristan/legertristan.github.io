# Using Reflection to Generate Code Dynamically

Today, most existing games have a user interface (UI) element displaying a value, a statistic, a quantity, or something else

![Examples of UI used to display information like values to the player. On the left, Digimon Survive (Bandai Namco Ltd. / HYDE), and on the right, Mario Tennis Aces (Nintendo / Camelot Software Planning).](resources/visuels/posts/reflection/Post_Reflexion_A.jpg)

In the same way, anyone developing a game is tasked with doing this, and even though it is a simple task, it quickly becomes redundant, especially when you have a lot of values to display. 

Following this consideration, I decided to develop a tool that would allow me to simply select a UI element, a value, and link the two, all in a maximum of 2 minutes. So, I started envisioning my UnityBindedGraphics plugin, which will rely on the methods offered by reflection to achieve the intended goals. 

![UnityBindedGraphics plugin banner.](resources/visuels/UBGVisuel.jpg)

> **Important**: To clarify the rest of the post, the goal is to present a simple and practical approach to the capabilities of reflection in creating dynamic code through my UnityBindedGraphics (UBG) plugin. This post is not intended to teach you how to handle reflection at an advanced stage but to open a door to what it can do and offer you insight! 

## What is reflection ? 

In programming, reflection is a system that allows an application to modify its own design. The program has the ability to modify its own data, examine them, or perform dynamic operations with the same data. 

Reflection clearly has significant advantages:
- It offers better code manageability through metadata containers.
- It allows dynamic interaction with a class (creation, modification, and invocation) without needing to know the type or have direct access to the class (via an instance, for example). 

These qualities make reflection an important tool in many applications, including game engines like Unreal Engine and Unity. Reflection is at the core of several concepts in game engines, such as data saving and loading systems. 

However, reflection brings along problems that can be tedious to address; we'll come back to this a bit later. 

## Plugin Setup 

Now that we understand the utility of reflection in the plugin, it is time to establish a plan. We will also set some constraints to ensure the plugin's smooth operation and simplify its development: 

- Since we need a value, it is logical that we only process the members of a class that can return a value.
- Regarding methods, only those without arguments will be offered in the editor to streamline the tool's functionality.
- However, we will consider both public and private methods, as well as methods belonging to parent classes. 

> **Important**: All the code snippets presented have been developed in Unity using C#. Native C++ does not offer a reflection system at the time of writing this article. Nevertheless, the theoretical part covered in this post is common to all programming languages and can be useful to you ! 

Everything is in place, and we can start developing the plugin. Since reflection is accessible from the System.Reflection library in native C#, we do not need to import any files into Unity. 

## Accessing Class Data Through Reflection 

Once the expected behavior of the application is clear, we can start with the first step of the plugin: offering the user the values they can link to a UI element. For this purpose, I have programmed a custom editor where the player can provide a MonoBehaviour component and, in return, receives a list of values they can display. The selected value will be the one displayed when the game launches. 

To retrieve the list of displayable values, we inspect each property and method member of the class and check that they meet the constraints mentioned earlier. Here is how we proceed with reflection:

1. We get the type of the component passed as a parameter in the custom editor using the GetType() extension method, which returns the class's type and all related metadata.
2. From the type, we can call GetMethods(BindingsFlags), which returns a list of methods present in the data type making the call. The BindingsFlags is an enumeration that allows us to filter which methods we want to retrieve (public, private methods, etc).
3. We apply the same principle to properties with GetProperties(BindingsFlags).
4. We can then display the available values based on their names using the 'name' variable.

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

> **Important**: It is important to note that, just like the Type class, which contains all the metadata for a given type, there are metadata containers for each type of member: FieldInfo, PropertyInfo, MethodInfo, etc. The parent class for member metadata containers is MemberInfo. 

To simplify the display of available values, I group PropertyInfo and MethodInfo under the MemberInfo class, resulting in the following: 

![The obtained values are displayed by their name in the 'Member to bind' dropdown list.](resources/visuels/posts/reflection/Post_Reflexion_B.png)

## Dynamically Calling a Method Using Reflection 

At this point, we have a custom editor that uses reflection to retrieve valid values to provide to our UI. So, we can now move on to the second phase of the project: linking the value to our UI element at the game's launch.

If we want, we can do this quite easily with the Invoke(object, object[]) method of the MethodInfo class. This method allows us to execute any function without knowing its type. We just need to provide it with the calling instance and the required arguments, and it is done. 

So, here are the steps:
1. We obtain our metadata container in the form of a MemberInfo.
2. From it, we extract the method that returns our value to display, whether it is a MethodInfo for a class or a GetMethod for a PropertyInfo.
3. We execute the return method via Invoke, and we display the value in the UI.

If our UI element is a text, the final rendering would be: 

```csharp
MethodInfo _method = ReflectionUtils.ExtractGetMethod(memberValue);
if (_method != null)
    refTxt.text = _method.Invoke(monoBehaviourReference, null).ToString();
```

> **Important**: ExtractGetMethod and the static class ReflectionUtils are small utilities that I have developed and do not belong to the System.Reflection library. The operation of ExtractGetMethod is not complicated; it involves a simple valid cast check, and if successful, I extract the necessary method as indicated earlier. 

As we can see, it is straightforward to call a method dynamically through reflection. However, in the case of UnityBindedGraphics, which may have multiple UI elements simultaneously linked to a value and regular updates of the value, this can be detrimental to performance. 

## The drawbacks of Reflection 

Let's go back to the drawbacks of reflection, as I mentioned earlier. In fact, the biggest drawback of reflection is also what gives it its strength: the data type we are interacting with is unknown at compile time. 

This unique feature of the system is also its weakness because it brings new challenges that we encounter less often in normal circumstances:
- Reflection requires more security when dealing with data since we do not know what type we are working with and what can be done with it.
- Calling methods via reflection requires determining the method, the method's declaring type, and the 'instigator' object's type for the invocation, not to mention the unknown arguments; in short, everything must be determined at runtime.
- Reflection promotes the boxing and unboxing of values.
- The compiler can perform very few optimizations and checks on method calls. 

> **Important**: Boxing and unboxing are conversions of a value type, like int, into an object type or an interface type that the value type implements. These are costly conversion operations that require allocating memory for a new object instance on the heap, you can find more information on boxing/unboxing here. 

Considering all of this, it quickly becomes a challenge for both us and the compiler to work with the reflection system. That's why we'll use a delegate to store the method that returns the value and call it without resorting to reflection. 

But two issues arise: the user determines the type of our value, and we need to create this delegate at the game's launch. So, first, we'll look into dynamically creating the method that will create the delegate, and then we'll figure out how to dynamically create this delegate.

## Dynamically create a generic method using reflection. 

To allow the plugin user to customize the delegate's behavior, we will create an interface IRefValueWrapper and a generic class RefValueContainer<TValueType> that will contain this delegate. 

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

Now let's revisit the first problem with this approach: the user determines the type of our value. Assuming our value is of type int, we would need to dynamically execute the following instruction: 

```csharp
Func<int> action = null;
int ReturnValue() => 0;
void CreateDelegate() => action += ReturnValue;
```

For this, reflection will help us again. In the System.Reflection library, there is a function MakeGenericMethod(Type[]). This method belongs to the MethodInfo class and takes an array of Types as parameters to return a new MethodInfo with the same definition as the initiating MethodInfo but with the desired types as parameters. Here's a much clearer example, assuming our value is of type int: 

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

> **Important**: Although MakeGenericMethod(Type[]) is a very powerful function, it can easily cause an exception because we are creating a generic method dynamically that is completely unknown to the compiler. So, be sure to secure your code when using this function. 

We now have a way to dynamically create our generic method that will pass the value's type to the delegate. All that's left is to find a way to dynamically create our delegate 

> **Important**: It's important to note that there are also other functions that allow you to create a type, a constructor, and more from a generic definition. 

## Dynamically create a delegate using reflection. 

We are getting closer to our goal, we need to find a way to dynamically create our delegate. 

If we delve into the System.Reflection documentation, we can find the CreateDelegate function. 

There are several overloads of this method, but we will use this one because it is the method we will link to an instantiated method. 

> **Important**: We will only deal with instance methods in our case because we have a reference to the component that has the method that returns the value. However, know that it is possible to create delegates for static methods as well. 

Now that we have a solution for each of our problems, we can propose a solution for updating our UI when our value changes dynamically; here is the result: 

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

> **Important**: Here, memberValue corresponds to our previously retrieved MemberInfo, and selectedType is the type of the value we want to display. 

To give the user the choice of how to update the value in the UI, we will offer an update through Unity's Update method or via a delegate that will also be dynamically created (in the same way as in the example just above). 

Finally, we are done. The plugin allows us to select a value to display, and in the game, it dynamically manages the display of our value in the UI. Our new solution allows updates that take 0.004ms to 0.012ms depending on the type of UI, which is quite good. 

This is where this post concludes. Reflection allows for deep manipulation of types, and I think this article has shown you the basics for creating many cool tools. Perhaps reflection has inspired you to create new tools ?