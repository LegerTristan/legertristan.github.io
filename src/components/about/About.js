import React, { useState, useEffect, useContext } from 'react'
import LanguageContext from '../languagesDropdown/LanguagesContext';
import './About.css';

function About() {
  const { currentLanguage } = useContext(LanguageContext);
  const [texts, setTexts] = useState(Array(30).fill({}));

  useEffect(() => {
      fetch(process.env.PUBLIC_URL + "resources/json/About.json")
      .then(response => response.json())
      .then(data => setTexts(data[currentLanguage.value]))
      .catch(error => console.error(error));
  }, [currentLanguage]);

  return (
    <>
      <header className="about-header">
        <h1>Tristan LEGER</h1>
        <p>Gameplay Programmer | MSc Artificial Intelligence Student</p>
      </header>
      <section className="about-container">
        <div className="about-layout">
            <article className="about-content">
                <div className="bio-container">
                    <p>
                        Passionné par la création numérique, je développe avec enthousiasme des outils et des mécaniques 
                        pour le jeu vidéo. Mon expertise se situe à la jonction entre le <strong>Gameplay Programming</strong> 
                        et l'<strong>Intelligence Artificielle</strong>.
                    </p>
                </div>
                
                <div className="experiences-section">
                    <h2 className="exp-title">Dernières Expériences</h2>
                    <div className="exp-grid-horizontal">
                        <div className="exp-item">
                            <strong>Gameplay Programmer</strong><br />X&Immersion
                        </div>
                        <div className="exp-item">
                            <strong>AI Programmer</strong><br />Outroad Fury
                        </div>
                        <div className="exp-item">
                            <strong>Gameplay Programmer</strong><br />Dwarfender
                        </div>
                    </div>
                </div>
            </article>

            <aside className="about-sidebar">
                <div className="info-card-blue">
                    <h3>Formation Actuelle</h3>
                    <p>Master of Science IA</p>
                    <span>SUPINFO (2024 - 2026)</span>
                </div>

                <div className="info-card-blue">
                    <h3>Poste Actuel</h3>
                    <p>Gameplay Programmer</p>
                    <span>X&Immersion (Paris)</span>
                </div>

                <div className="info-card-blue">
                    <h3>Top Skills</h3>
                    <div className="tags-compact">
                        <span>C++</span> <span>C#</span> <span>Python</span>
                        <span>Unreal</span> <span>Unity</span>
                        <span>AI / ML</span>
                    </div>
                </div>
            </aside>
        </div>
      </section>
    </>
  );
}

export default About;