import React, { useState, useRef, useEffect } from 'react'
import './Popup.css';

function Popup({title, imgSrc, imgAlt, videoSrc, onPopupActivate, onPopupDeactivate, joinRef, children}) 
{
    const [isTriggered, SetIsTriggered] = useState(false);
    const [isHovered, SetIsHovered] = useState(false);
    const [isClosing, SetIsClosing] = useState(false);

    const popupInnerRef = useRef(null);

    const DisplayVideo = (value) =>
    {
        if(!videoSrc || !imgSrc || isTriggered)
            return;
            
        SetIsHovered(value);
    }

    const TriggerPopup = () =>
    {
        if(!imgSrc || isTriggered)
            return;

        SetIsTriggered(true);
        SetIsHovered(false);
        onPopupActivate();
    }

    const ClosePopup = () =>
    {
        if(!imgSrc)
            return;

        SetIsTriggered(false);
        SetIsHovered(false);
        SetIsClosing(false);
        onPopupDeactivate();
    }


    useEffect(() => {
        const handleAnimationEnd = () => {
          if (isClosing) {
            // Fermez la popup ici
            ClosePopup();
          }
        };
      
        if (popupInnerRef.current) {
          popupInnerRef.current.addEventListener('animationend', handleAnimationEnd);
        }
      
        return () => {
          if (popupInnerRef.current) {
            popupInnerRef.current.removeEventListener('animationend', handleAnimationEnd);
          }
        };
      }, [isClosing]);

    
    const VisualContent = (playVideo) =>
    (
        playVideo && videoSrc ?
                    (
                        <video src={videoSrc} disablePictureInPicture autoPlay loop muted/>
                    ) :
                    (
                        <img src={imgSrc} alt={imgAlt}/>
                    )
    );

    return (
        <>
            <article className="popup" onMouseEnter={() => DisplayVideo(true)} onMouseLeave={() => DisplayVideo(false)} onClick={TriggerPopup}>
                {VisualContent(isHovered)}
                <p>{title}</p>
            </article>
            {isTriggered ?
            (
                <div className="popupBackground">
                    <div className="popupMain">
                        <div className={isClosing ? 'popupInnerClosing' : 'popupInner'} ref={popupInnerRef}>
                            <article>
                                <h2>{title}</h2>
                                {VisualContent(true)}
                                <a className={`${joinRef ? 'joinLink' : 'errorLink'}`} href={joinRef} target="_blank" rel="noopener noreferrer">Télécharger</a>
                                {children}
                                <hr />
                                <div className="closeBtnContainer">
                                    <img src={process.env.PUBLIC_URL + "resources/icons/iconClose.png"} alt="Fermer" className="closeBtn" onClick={() => SetIsClosing(true)}/>
                                    <img src={process.env.PUBLIC_URL + "resources/icons/iconCloseHovered.png"} alt="Fermer" className="closeBtnHovered" onClick={() => SetIsClosing(true)}/>
                                </div>
                            </article>
                        </div>
                    </div>
                </div> 
            ) : 
            (
                ""
            )}
        </>
  );
}

export default Popup;