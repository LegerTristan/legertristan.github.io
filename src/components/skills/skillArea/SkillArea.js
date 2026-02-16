import SkillInfo from '../skillInfo/SkillInfo';
import './SkillArea.css';

function SkillArea({ areaData, texts }) {
    return (
        <article className="skill-category-block">
            <div className="category-header">
                <h2>{texts[areaData.titleId]}</h2>
            </div>
            <div className="skills-items-container">
                {
                    Array.isArray(areaData.infos) && 
                    areaData.infos.map((skill, index) => (
                        <SkillInfo 
                            key={index} 
                            title={texts[skill.titleId]} 
                            imgSrc={skill.imageSrc} 
                            imgAlt={skill.imageAlt} 
                            dsc={texts[skill.descId]}
                        />
                    ))
                }
            </div>
        </article>
    );
}

export default SkillArea;