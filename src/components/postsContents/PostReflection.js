import React, { useState, useContext, useEffect } from 'react';
import LanguageContext from '../languagesDropdown/LanguagesContext';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// ============== COMPONENTS =================

import CaptionedFigure from '../captionedFigure/CaptionedFigure';
import ImportantText from '../importantText/ImportantText';
import TableContents from '../tableContents/TableContents';

// ============== DATA =================
import './PostReflection.css';

function PostReflection()
{  
    const { currentLanguage } = useContext(LanguageContext);
    const [texts, setTexts] = useState(Array(100).fill({}));

    useEffect(() => {
    fetch(process.env.PUBLIC_URL + "resources/json/Post_Reflection.json")
    .then(response => response.json())
    .then(data => setTexts(data[currentLanguage.value]))
    .catch(error => console.error(error));
    }, [currentLanguage]);

    const codeInspectData = `
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
    } `;

    const codeTestInvoke = `
    MethodInfo _method = ReflectionUtils.ExtractGetMethod(memberValue);
    if (_method != null)
        refTxt.text = _method.Invoke(monoBehaviourReference, null).ToString();
   `;

    const codeIRefValueWrapper = `
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
   `;

    const codeExampleIntDelegate = `
    Func<int> action = null;
    int ReturnValue() => 0;
    void CreateDelegate() => action += ReturnValue;
    `;

    const codeExampleGenericMethod = `
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
   `;

    const codeCreateDynamicFinal = `
    void InitGetterValueBinding()
    {
        // Extract getter method and value’s type of the MemberInfo.
        MethodInfo _methodInfo = ReflectionUtils.ExtractGetMethod(memberValue);
        selectedType = ReflectionUtils.ExtractType(_ memberValue);

        // Make a new generic method with the specific selected type based on 
        CreateRefValueWrapper method.
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
    `;

    return(
        <section className="postContent">
            <h1 id="postReflection">{texts[0].text}</h1> 

            <TableContents/>

            <p>{texts[1].text}</p>
            <CaptionedFigure 
                imgSrc={"resources/visuels/posts/reflection/Post_Reflexion_A.jpg"} 
                imgAlt={"Visual of two games using user interfaces."} 
                captionText={texts[2].text}
            />
            <p>{texts[3].text}</p>
            <p>{texts[4].text}</p>
            <CaptionedFigure 
                imgSrc={"resources/visuels/UBGVisuel.jpg"} 
                imgAlt={"Banner of UnityBindedGraphics."} 
                captionText={texts[5].text}
            />
            <ImportantText text={texts[6].text}/>

            <h2 id="whatReflection">{texts[7].text}</h2>
            <p>
                {texts[8].text}
                <a href="https://learn.microsoft.com/en-us/dotnet/framework/reflection-and-codedom/reflection">
                    Reflection in .NET
                </a>
            </p>
            <p>{texts[9].text}</p>
            <ul>
                <li>{texts[10].text}</li>
                <li>{texts[11].text}</li>
            </ul>
            <p>{texts[12].text}</p>
            <p>{texts[13].text}</p>

            <h2 id="pluginSetup">{texts[14].text}</h2>
            <p>{texts[15].text}</p>
            <ul>
                <li>{texts[16].text}</li>
                <li>{texts[17].text}</li>
                <li>{texts[18].text}</li>
            </ul>
            <ImportantText text={texts[19].text}/>
            <p>{texts[20].text}</p>

            <h2 id="dataAccess">{texts[21].text}</h2>
            <p>{texts[22].text}</p>
            <p>{texts[23].text}</p>
            <ol>
                <li>{texts[24].text}</li>
                <li>{texts[25].text}</li>
                <li>{texts[26].text}</li>
                <li>{texts[27].text}</li>
            </ol>
            <SyntaxHighlighter language="csharp" style={darcula}>
                {codeInspectData}
            </SyntaxHighlighter>
            <ImportantText text={texts[28].text}>
                <a href="https://learn.microsoft.com/en-us/dotnet/api/system.reflection.memberinfo?view=net-7.0">
                    MemberInfo Class
                </a>
            </ImportantText>
            <p>{texts[29].text}</p> 
            <CaptionedFigure 
                imgSrc={"resources/visuels/posts/reflection/Post_Reflexion_B.png"} 
                imgAlt={"Custom editor for components of UnityBindedGraphics plugin."} 
                captionText={texts[30].text}
            />

            <h2 id="dynamicCall">{texts[31].text}</h2>
            <p>{texts[32].text}</p>
            <p>{texts[33].text}</p>
            <p>{texts[34].text}</p>
            <ol>
                <li>{texts[35].text}</li>
                <li>{texts[36].text}</li>
                <li>{texts[37].text}</li>
            </ol>
            <p>{texts[38].text}</p>
            <SyntaxHighlighter language="csharp" style={darcula}>
                {codeTestInvoke}
            </SyntaxHighlighter>
            <ImportantText text={texts[39].text}/>
            <p>{texts[40].text}</p>


            <h2 id="drawbacksReflection">{texts[41].text}</h2>
            <p>{texts[42].text}</p>
            <p>{texts[43].text}</p>
            <ul>
                <li>{texts[44].text}</li>
                <li>{texts[45].text}</li>
                <li>{texts[46].text}</li>
                <li>{texts[47].text}</li>
            </ul>
            <ImportantText text={texts[48].text}>
                <a href="https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/types/boxing-and-unboxing">
                    ici
                </a>
            </ImportantText>
            <p>{texts[49].text}</p>
            <p>{texts[50].text}</p>

            <h2 id="createMethod">{texts[51].text}</h2>
            <p>{texts[52].text}</p>
            <SyntaxHighlighter language="csharp" style={darcula}>
                {codeIRefValueWrapper}
            </SyntaxHighlighter>
            <p>{texts[53].text}</p>
            <SyntaxHighlighter language="csharp" style={darcula}>
                {codeExampleIntDelegate}
            </SyntaxHighlighter>
            <p>{texts[54].text}</p>
            <SyntaxHighlighter language="csharp" style={darcula}>
                {codeExampleGenericMethod}
            </SyntaxHighlighter>
            <ImportantText text={texts[55].text}/>
            <p>{texts[56].text}</p>
            <ImportantText text={texts[57].text}>
                <a href="https://learn.microsoft.com/en-us/dotnet/api/system.type.makegenerictype?view=net-7.0">
                    Type.MakeGenericType(Type[])
                </a>
            </ImportantText>

            <h2 id="createDelegate">{texts[58].text}</h2>
            <p>{texts[59].text}</p>
            <p>
                {texts[60].text}
                <a href="https://learn.microsoft.com/en-us/dotnet/api/system.delegate.createdelegate?view=net-7.0">
                    Delegate.CreateDelegate
                </a>
            </p>
            <p>{texts[61].text}</p>
            <ImportantText text={texts[62].text}/>
            <p>{texts[63].text}</p>
            <SyntaxHighlighter language="csharp" style={darcula}>
                {codeCreateDynamicFinal}
            </SyntaxHighlighter>
            <ImportantText text={texts[64].text}/>
            <p>{texts[65].text}</p>
            <p>{texts[66].text}</p>
            <p>{texts[67].text}</p>

        </section>
    );
    
}

export default PostReflection;