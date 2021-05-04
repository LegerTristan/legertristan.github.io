import React from 'react'
import './ImageWDsc.css'

function ImageWDsc(props){
    return(props.isInvert) ? (
        <div
        style={{
            backgroundImage: `url(${props.banner})`,
            backgroundRepeat: 'no-repeat',
          }}
           className="IWDMain">
            <div className="BannerTextInvert">
                {props.children}
            </div>
        </div>
    ) :
    (
        <div 
        style={{
            backgroundImage: `url(${props.banner})`,
          }}
          className="IWDMain">
            <div className="BannerText">
                {props.children}
            </div>
        </div>
    );
}

export default ImageWDsc;