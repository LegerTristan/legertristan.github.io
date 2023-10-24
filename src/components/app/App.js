import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
// ============  Routers  ===================
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// ============ Contexts ==================
import LanguageContext from '../languagesDropdown/LanguagesContext';
// ============ Components ==================
import Menu from '../navigation/Menu';
import MobileMenu from '../navigation/mobile/MobileMenu';
import About from '../about/About';
import Skills from '../skills/Skills';
import Portfolio from '../portfolio/Portfolio';
import Posts from '../posts/Posts';
import PostReflection from '../postsContents/PostReflection';
import Contacts from '../contacts/Contacts';
import Footer from '../footer/Footer';
// =============   Datas  ===================
import menuData from '../navigation/MenuData';
import languagesData from '../languagesDropdown/LanguagesData';
import './App.css';

function App() {
  const matches = useMediaQuery('(min-width:720px)');
  const [ currentLanguage, setCurrentLanguage ] = useState(languagesData[0]);
  return (
    <LanguageContext.Provider value={{currentLanguage, setCurrentLanguage}}>
      <Router>
        {matches ? 
        (
          <Menu pages={menuData}/>
        ) :
        (
          <MobileMenu pages={menuData}/>
        )}
        
        <Routes>
          <Route path="/" element={<About/>} />
          <Route path="/skills" element={<Skills/>} />
          <Route path="/portfolio" element={<Portfolio/>} />
          <Route path="/posts" element={<Posts/>} />
          <Route path="/posts_reflection" element={<PostReflection/>} />
          <Route path="/contacts" element={<Contacts/>} />
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
      </Router>
      <Footer />
    </LanguageContext.Provider>
  );
}

export default App;
