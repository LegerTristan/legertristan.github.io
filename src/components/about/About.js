import React, { useState, useEffect, useContext } from 'react'
import LanguageContext from '../languagesDropdown/LanguagesContext';
import './About.css';

function About() {
  const { currentLanguage } = useContext(LanguageContext);
  const [texts, setTexts] = useState(Array(11).fill({}));

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
        <p>{texts[6]?.text}</p>
      </header>
      <section className="about-container">
        <div className="about-layout">
            <article className="about-content">
                <div className="bio-container">
                    <p>
                        <strong>{texts[0]?.text}</strong>
                    </p>
                    <p>
                        {texts[1]?.text}
                    </p>
                    <p>
                        {texts[2]?.text}
                    </p>
                    <p>
                        {texts[3]?.text}
                    </p>
                </div>
                
                <div className="experiences-section info-card-flat">
                    <h2 className="exp-title">{texts[7]?.text}</h2>
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
                <div className="info-card-blue animate-load">
                    <h3>{texts[8]?.text}</h3>
                    <p>Master of Science IA</p>
                    <span>SUPINFO (2024 - 2026)</span>
                </div>

                <div className="info-card-blue animate-load">
                    <h3>{texts[9]?.text}</h3>
                    <p>Gameplay Programmer</p>
                    <span>X&Immersion (Paris)</span>
                </div>

                <div className="info-card-blue animate-load">
                    <h3>{texts[10]?.text}</h3>
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