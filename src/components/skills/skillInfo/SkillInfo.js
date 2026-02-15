import React, { useState } from 'react';
import './SkillInfo.css';

function SkillInfo({title, imgSrc, imgAlt, dsc}) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={`skill-item-row ${isExpanded ? 'active' : ''}`} onClick={() => setIsExpanded(!isExpanded)}>
            <div className="skill-item-header">
                <div className="skill-icon-wrapper">
                    <img src={imgSrc} alt={imgAlt} />
                </div>
                <span className="skill-name">{title}</span>
                <span className={`skill-arrow ${isExpanded ? 'up' : 'down'}`}></span>
            </div>
            {isExpanded && (
                <div className="skill-description-panel">
                    <p>{dsc}</p>
                </div>
            )}
        </div>
    );
}

export default SkillInfo;