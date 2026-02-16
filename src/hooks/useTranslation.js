import { useState, useEffect, useContext } from 'react';
import LanguageContext from '../components/languagesDropdown/LanguagesContext';

function useTranslation(jsonFileName) {
  const { currentLanguage } = useContext(LanguageContext);
  const [texts, setTexts] = useState({});

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/resources/json/${jsonFileName}.json`)
      .then(response => response.json())
      .then(data => setTexts(data[currentLanguage.value]))
      .catch(error => console.error(`Error loading ${jsonFileName}.json:`, error));
  }, [currentLanguage, jsonFileName]);

  return texts;
}

export default useTranslation;