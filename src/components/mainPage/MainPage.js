import React from 'react';
import useTranslation from '../../hooks/useTranslation';
import About from '../about/About';
import Portfolio from '../portfolio/Portfolio';
import Skills from '../skills/Skills';
import Contacts from '../contacts/Contacts';
import { Link } from 'react-router-dom';
import './MainPage.css';

function MainPage() {
  const texts = useTranslation('MainPage');

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
        <h2 className="section-title">{texts.BlogTitle}</h2>
        <p>{texts.BlogSubtitle}</p>
        <Link to="/posts" className="btn-see-posts">{texts.BlogBtn}</Link>
      </section>

      <section id="contact" className="section-container">
        <h2 className="section-title">Contact</h2>
        <Contacts />
      </section>
    </main>
  );
}

export default MainPage;