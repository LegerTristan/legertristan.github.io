import React from 'react'
import './AnimatedBackground.css'

function AnimatedBackground(props){
    return (
        <div className="Canvas">
          <div 
            style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + "/images/fd_IconesV2.jpg"})`,
            }}
            className="IconBackgroundWrapper">
              <div 
                style={{
                backgroundImage: `url(${process.env.PUBLIC_URL + "/images/fd_Icones_Slide.png"})`,
                backgroundRepeat: 'repeat'
                }}
                className="IconBackgroundSlider">
                  
              </div>
          </div>
          <article className="Content">
            {props.children}
          </article> 
        </div>
    )
}

export default AnimatedBackground;