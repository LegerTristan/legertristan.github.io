import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LanguageContext from '../languagesDropdown/LanguagesContext';
import Menu from '../navigation/Menu';
import MobileMenu from '../navigation/mobile/MobileMenu';
import Posts from '../posts/Posts';
import PostReflection from '../postsContents/PostReflection';
import Footer from '../footer/Footer';
import MainPage from '../mainPage/MainPage'; // Check this path!
import menuData from '../navigation/MenuData';
import languagesData from '../languagesDropdown/LanguagesData';
import './App.css';

function App() {
  const matches = useMediaQuery('(min-width:720px)');
  const [ currentLanguage, setCurrentLanguage ] = useState(languagesData[0]);

  return (
    <LanguageContext.Provider value={{currentLanguage, setCurrentLanguage}}>
      <Router>
        {matches ? <Menu pages={menuData}/> : <MobileMenu pages={menuData}/>}
        
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/posts" element={<Posts/>} />
          <Route path="/posts_reflection" element={<PostReflection/>} />
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
      </Router>
      <Footer />
    </LanguageContext.Provider>
  );
}

export default App;