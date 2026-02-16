import React from 'react';
import useTranslation from '../../hooks/useTranslation';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CaptionedFigure from '../captionedFigure/CaptionedFigure';
import ImportantText from '../importantText/ImportantText';
import TableContents from '../tableContents/TableContents';
import './PostReflection.css';

function PostReflection()
{  
    const texts = useTranslation('PostReflection');

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
        MethodInfo _genericMethod = GetType().GetMethod("GenericMethod", BindingFlags.Instance | BindingFlags.NonPublic);
        MethodInfo _newIntMethod = _genericMethod?.MakeGenericMethod(new Type[] { typeof(int) });
    }
   `;

    const codeCreateDynamicFinal = `
    void InitGetterValueBinding()
    {
        MethodInfo _methodInfo = ReflectionUtils.ExtractGetMethod(memberValue);
        selectedType = ReflectionUtils.ExtractType(_ memberValue);

        MethodInfo _createRefValueMethod = typeof(BindedGraphic).GetMethod(CREATE_REF_VALUE_WRAPPER, ReflectionUtils.AllBindings);
        MethodInfo _genericCreateRefValueMethod = _createRefValueMethod.MakeGenericMethod(new Type[] { selectedType });

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
            <h1 id="postReflection">{texts.P_Reflection_Title}</h1> 

            <TableContents/>

            <p>{texts.P_Reflection_Part1}</p>
            <CaptionedFigure 
                imgSrc={"resources/visuels/posts/reflection/Post_Reflexion_A.jpg"} 
                imgAlt={"Visual of two games using user interfaces."} 
                captionText={texts.P_Reflection_Caption1}
            />
            <p>{texts.P_Reflection_Part2}</p>
            <p>{texts.P_Reflection_Part3}</p>
            <CaptionedFigure 
                imgSrc={"resources/visuels/UBGVisuel.jpg"} 
                imgAlt={"Banner of UnityBindedGraphics."} 
                captionText={texts.P_Reflection_Caption2}
            />
            <ImportantText text={texts.P_Reflection_ImportantPart1}/>

            <h2 id="whatReflection">{texts.P_Reflection_Subtitle1}</h2>
            <p>
                {texts.P_Reflection_Part4}
                <a href="https://learn.microsoft.com/en-us/dotnet/framework/reflection-and-codedom/reflection">
                    Reflection in .NET
                </a>
            </p>
            <p>{texts.P_Reflection_Part5}</p>
            <ul>
                <li>{texts.P_Reflection_Flea1}</li>
                <li>{texts.P_Reflection_Flea2}</li>
            </ul>
            <p>{texts.P_Reflection_Part6}</p>
            <p>{texts.P_Reflection_Part7}</p>

            <h2 id="pluginSetup">{texts.P_Reflection_Subtitle2}</h2>
            <p>{texts.P_Reflection_Part8}</p>
            <ul>
                <li>{texts.P_Reflection_Flea3}</li>
                <li>{texts.P_Reflection_Flea4}</li>
                <li>{texts.P_Reflection_Flea5}</li>
            </ul>
            <ImportantText text={texts.P_Reflection_ImportantPart2}/>
            <p>{texts.P_Reflection_Part9}</p>

            <h2 id="dataAccess">{texts.P_Reflection_Subtitle3}</h2>
            <p>{texts.P_Reflection_Part10}</p>
            <p>{texts.P_Reflection_Part11}</p>
            <ol>
                <li>{texts.P_Reflection_Flea6}</li>
                <li>{texts.P_Reflection_Flea7}</li>
                <li>{texts.P_Reflection_Flea8}</li>
                <li>{texts.P_Reflection_Flea9}</li>
            </ol>
            <SyntaxHighlighter language="csharp" style={darcula}>
                {codeInspectData}
            </SyntaxHighlighter>
            <ImportantText text={texts.P_Reflection_ImportantPart3}>
                <a href="https://learn.microsoft.com/en-us/dotnet/api/system.reflection.memberinfo?view=net-7.0">
                    MemberInfo Class
                </a>
            </ImportantText>
            <p>{texts.P_Reflection_Part12}</p> 
            <CaptionedFigure 
                imgSrc={"resources/visuels/posts/reflection/Post_Reflexion_B.png"} 
                imgAlt={"Custom editor for components of UnityBindedGraphics plugin."} 
                captionText={texts.P_Reflection_Caption3}
            />

            <h2 id="dynamicCall">{texts.P_Reflection_Subtitle4}</h2>
            <p>{texts.P_Reflection_Part13}</p>
            <p>{texts.P_Reflection_Part14}</p>
            <p>{texts.P_Reflection_Part15}</p>
            <ol>
                <li>{texts.P_Reflection_Flea10}</li>
                <li>{texts.P_Reflection_Flea11}</li>
                <li>{texts.P_Reflection_Flea12}</li>
            </ol>
            <p>{texts.P_Reflection_Part16}</p>
            <SyntaxHighlighter language="csharp" style={darcula}>
                {codeTestInvoke}
            </SyntaxHighlighter>
            <ImportantText text={texts.P_Reflection_ImportantPart4}/>
            <p>{texts.P_Reflection_Part17}</p>


            <h2 id="drawbacksReflection">{texts.P_Reflection_Subtitle5}</h2>
            <p>{texts.P_Reflection_Part18}</p>
            <p>{texts.P_Reflection_Part19}</p>
            <ul>
                <li>{texts.P_Reflection_Flea13}</li>
                <li>{texts.P_Reflection_Flea14}</li>
                <li>{texts.P_Reflection_Flea15}</li>
                <li>{texts.P_Reflection_Flea16}</li>
            </ul>
            <ImportantText text={texts.P_Reflection_ImportantPart5}>
                <a href="https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/types/boxing-and-unboxing">
                    ici
                </a>
            </ImportantText>
            <p>{texts.P_Reflection_Part20}</p>
            <p>{texts.P_Reflection_Part21}</p>

            <h2 id="createMethod">{texts.P_Reflection_Subtitle6}</h2>
            <p>{texts.P_Reflection_Part22}</p>
            <SyntaxHighlighter language="csharp" style={darcula}>
                {codeIRefValueWrapper}
            </SyntaxHighlighter>
            <p>{texts.P_Reflection_Part23}</p>
            <SyntaxHighlighter language="csharp" style={darcula}>
                {codeExampleIntDelegate}
            </SyntaxHighlighter>
            <p>{texts.P_Reflection_Part24}</p>
            <SyntaxHighlighter language="csharp" style={darcula}>
                {codeExampleGenericMethod}
            </SyntaxHighlighter>
            <ImportantText text={texts.P_Reflection_ImportantPart6}/>
            <p>{texts.P_Reflection_Part25}</p>
            <ImportantText text={texts.P_Reflection_ImportantPart7}>
                <a href="https://learn.microsoft.com/en-us/dotnet/api/system.type.makegenerictype?view=net-7.0">
                    Type.MakeGenericType(Type[])
                </a>
            </ImportantText>

            <h2 id="createDelegate">{texts.P_Reflection_Subtitle7}</h2>
            <p>{texts.P_Reflection_Part26}</p>
            <p>
                {texts.P_Reflection_Part27}
                <a href="https://learn.microsoft.com/en-us/dotnet/api/system.delegate.createdelegate?view=net-7.0">
                    Delegate.CreateDelegate
                </a>
            </p>
            <p>{texts.P_Reflection_Part28}</p>
            <ImportantText text={texts.P_Reflection_ImportantPart8}/>
            <p>{texts.P_Reflection_Part29}</p>
            <SyntaxHighlighter language="csharp" style={darcula}>
                {codeCreateDynamicFinal}
            </SyntaxHighlighter>
            <ImportantText text={texts.P_Reflection_ImportantPart9}/>
            <p>{texts.P_Reflection_Part30}</p>
            <p>{texts.P_Reflection_Part31}</p>
            <p>{texts.P_Reflection_Part32}</p>

        </section>
    );
    
}

export default PostReflection;