import React, { useState, useRef, useEffect } from 'react';
import './SkillInfo.css';

function SkillInfo({title, imgSrc, imgAlt, dsc}) {
    const [isTriggered, SetIsTriggered] = useState(false);
    const [triggeredAtLeastOnce, SetTriggeredAtLeastOnce] = useState(false);
    const container = useRef(null);

    const getRandomDuration = () =>
    {
        return (Math.random() * 3) + 5 + 's';
    }

    const UpdateTriggerState = () =>
    {
        SetTriggeredAtLeastOnce(true);
        SetIsTriggered(!isTriggered);
    }

    useEffect(() => 
    {
       if(!container)
            return; 

        container.current.style.animationDuration = getRandomDuration();
    }, [])

    return (
        <div className='skillInfo' ref={container}>
            <img src={imgSrc} alt={imgAlt} onClick={UpdateTriggerState} />
            <h2>{title}</h2>
            {
                triggeredAtLeastOnce ? <p className={isTriggered ? 'visibleSkillDsc' : 'hiddenSkillDsc'}>{dsc}</p> : ""
            }
        </div>
    );
}

export default SkillInfo;