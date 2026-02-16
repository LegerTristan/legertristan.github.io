import useTranslation from '../../hooks/useTranslation';
import SkillArea from './skillArea/SkillArea';
import skillsAreaData from './skillArea/SkillsAreaData';
import './Skills.css';

function Skills() {
  const texts = useTranslation('Skills');

  return (
    <section className="skills-grid">
      {
        Array.isArray(skillsAreaData) && 
        skillsAreaData.map((skillAreaData) => (
            <SkillArea key={skillAreaData.titleIndex} areaData={skillAreaData} texts={texts}/>
        ))
      }
    </section>
  );
}

export default Skills;