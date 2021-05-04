import React from 'react'
import './Popup.css'

function Popup(props){
    return(props.trigger) ? (
        <div className="popupMain">
            <div className="popupInner" style={{
                backgroundColor: props.color,
            }}>
                <article>
                    {props.children} 
                    <img src={process.env.PUBLIC_URL + "/icones/iconeClose.png"} alt="Fermer" className="closeBtn" onClick={() => props.setTrigger(false)}/>
                </article>
            </div>
        </div>
    ) : "";
}

export default Popup;