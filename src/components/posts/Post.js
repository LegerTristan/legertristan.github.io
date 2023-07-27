import React, { useState, useContext, useEffect} from 'react';
import LanguageContext from '../languagesDropdown/LanguagesContext';
import './Post.css';

function Post() {
  const { currentLanguage } = useContext(LanguageContext);
  const [ texts, setTexts ] = useState(Array(3).fill({})); 

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "resources/json/Posts.json")
    .then(response => response.json())
    .then(data => setTexts(data[currentLanguage.value]))
    .catch(error => console.error(error));
  }, [currentLanguage]);

  return (
    <section>
      <p>{texts[0].text}</p>
    </section>
  );
}

export default Post;