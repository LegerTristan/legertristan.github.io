import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LanguageContext from '../languagesDropdown/LanguagesContext';
import Menu from '../navigation/Menu';
import MobileMenu from '../navigation/mobile/MobileMenu';
import Posts from '../posts/Posts';
import Footer from '../footer/Footer';
import MainPage from '../mainPage/MainPage';
import menuData from '../navigation/MenuData';
import languagesData from '../languagesDropdown/LanguagesData';
import PostDetail from '../postsContents/PostDetail';
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
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
      </Router>
      <Footer />
    </LanguageContext.Provider>
  );
}

export default App;