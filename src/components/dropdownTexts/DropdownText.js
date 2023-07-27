import React from 'react'
import { useState } from 'react'
import './DropdownText.css'

function DropdownText({ title, children }){
    
    const [display, setDisplay] = useState(false);
    const [isTriggered, SetIsTriggered] = useState(false);

    return(
        <>
            <div className="ddText">
                <a onClick={() => { 
                    SetIsTriggered(!isTriggered);
                    setDisplay(!display);
                }}>
                    <h1>{title}</h1>
                    <img 
                        src={process.env.PUBLIC_URL + "resources/icons/iconArrow.png"}
                        alt="Arrow icon"
                        style={ isTriggered ? { transform:'rotate(-90deg)'} : {transform : 'rotate(0deg)'} }
                    />
                </a>
                <hr/>
            </div>

            {isTriggered && 
            (<div className={display ? 'textContentDisplayed' : 'textContentHidden'}>
                {children}
            </div>)}
        </>
    );
}

export default DropdownText;