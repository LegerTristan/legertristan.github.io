import React from 'react';
import useTranslation from '../../hooks/useTranslation';
import './About.css';

function About() {
  const texts = useTranslation('About');

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
                    <p>{texts[1]?.text}</p>
                    <p>{texts[2]?.text}</p>
                    <p>{texts[3]?.text}</p>
                </div>
                
                <div className="experiences-section info-card-flat">
                    <h2 className="exp-title">{texts[7]?.text}</h2>
                    <div className="exp-grid-horizontal">
                        <div className="exp-item">
                            <strong>Gameplay Programmer</strong><br />X&Immersion<br />
                            <span className="exp-date">2024 - Present</span>
                        </div>
                        <div className="exp-item">
                            <strong>AI Programmer</strong><br />Outroad Fury<br />
                            <span className="exp-date">2023 - 2024</span>
                        </div>
                        <div className="exp-item">
                            <strong>Gameplay Programmer</strong><br />Dwarfender<br />
                            <span className="exp-date">2022</span>
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