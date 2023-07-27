
import React, { useState, useEffect, useContext } from 'react'
import LanguageContext from '../languagesDropdown/LanguagesContext';
import SkillArea from './skillArea/SkillArea';
import skillsAreaData from './skillArea/SkillsAreaData';
import './Skills.css';

function Skills() {
  const { currentLanguage } = useContext(LanguageContext);
  const [texts, setTexts] = useState(Array(100).fill({}));

  useEffect(() => {
      fetch(process.env.PUBLIC_URL + "resources/json/Skills.json")
      .then(response => response.json())
      .then(data => setTexts(data[currentLanguage.value]))
      .catch(error => console.error(error));
  }, [currentLanguage]);

  return (
    <section className="skills">
      {
        Array.isArray(skillsAreaData) && 
        skillsAreaData.map((skillAreaData) => (<SkillArea key={skillAreaData.titleIndex} areaData={skillAreaData} texts={texts}/>))
      }
    </section>
  );
}

export default Skills;