import React, { useState } from 'react';
// ============  Routers  ===================
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// ============ Contexts ==================
import LanguageContext from '../languagesDropdown/LanguagesContext';
// ============ Components ==================
import Menu from '../navigation/Menu';
import About from '../about/About';
import Skills from '../skills/Skills';
import Portfolio from '../portfolio/Portfolio';
import Blog from '../blogs/Blog';
import Contacts from '../contacts/Contacts';
import Footer from '../footer/Footer';
// =============   Datas  ===================
import menuData from '../navigation/MenuData';
import languagesData from '../languagesDropdown/LanguagesData';
import './App.css';

function App() {
  const [ currentLanguage, setCurrentLanguage ] = useState(languagesData[0]);
  return (
    <LanguageContext.Provider value={{currentLanguage, setCurrentLanguage}}>
      <Router>
        <Menu pages={menuData}/>
        <Routes>
          <Route path="/" element={<About/>} />
          <Route path="/skills" element={<Skills/>} />
          <Route path="/portfolio" element={<Portfolio/>} />
          <Route path="/blogs" element={<Blog/>} />
          <Route path="/contacts" element={<Contacts/>} />
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
      </Router>
      <Footer />
    </LanguageContext.Provider>
  );
}

export default App;
