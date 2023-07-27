import React from 'react';
import SkillInfo from '../skillInfo/SkillInfo';
import './SkillArea.css';

function SkillArea({areaData, texts}) {
    return (
        <article>
            <hr />
            <h1>{texts[areaData.titleIndex].text}</h1>
            <hr />
            <div className="skillsFarm">
                {
                    Array.isArray(areaData.infos) && Array.isArray(texts) &&
                    areaData.infos.map((skill) =>
                    (
                        <SkillInfo key={skill.titleIndex} title={texts[skill.titleIndex].text} imgSrc={skill.imageSrc} imgAlt={skill.imageAlt} dsc={texts[skill.descriptionIndex].text}/>
                    ))
                }
            </div>
        </article>
    );
}

export default SkillArea;