import React, { useState, useEffect, useContext } from 'react';
import LanguageContext from '../languagesDropdown/LanguagesContext';
import About from '../about/About';
import Portfolio from '../portfolio/Portfolio';
import Skills from '../skills/Skills';
import Contacts from '../contacts/Contacts';
import { Link } from 'react-router-dom';
import './MainPage.css';

function MainPage() {
  const { currentLanguage } = useContext(LanguageContext);
  const [texts, setTexts] = useState(Array(3).fill({}));

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "resources/json/MainPage.json")
      .then(response => response.json())
      .then(data => setTexts(data[currentLanguage.value]))
      .catch(error => console.error(error));
  }, [currentLanguage]);

  return (
    <main className="main-page">
      <section id="about" className="section-container">
        <About />
      </section>

      <section id="portfolio" className="section-container section-dark">
        <h2 className="section-title">Portfolio</h2>
        <Portfolio />
      </section>

      <section id="skills" className="section-container">
        <h2 className="section-title">Skills</h2>
        <Skills />
      </section>

      <section id="posts-preview" className="section-container section-dark posts-preview">
        <h2 className="section-title">{texts[0]?.text}</h2>
        <p>{texts[1]?.text}</p>
        <Link to="/posts" className="btn-see-posts">{texts[2]?.text}</Link>
      </section>

      <section id="contact" className="section-container">
        <h2 className="section-title">Contact</h2>
        <Contacts />
      </section>
    </main>
  );
}

export default MainPage;