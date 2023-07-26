import React, { useState, useContext, useEffect} from 'react';
import LanguageContext from '../languagesDropdown/LanguagesContext';
import './Contacts.css';

function Contacts() {
  const { currentLanguage } = useContext(LanguageContext);
  const [ texts, setTexts ] = useState(Array(3).fill({})); 

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "resources/json/Contacts.json")
    .then(response => response.json())
    .then(data => setTexts(data[currentLanguage.value]))
    .catch(error => console.error(error));
  }, [currentLanguage]);

  return (
    <section className="Contacts">
      <aside>
        <img src="/resources/icons/IconGmail.png" alt="Gmail icon" className="iconGmail"/>
        <img src="/resources/icons/IconItchIo.png" alt="Itch.io icon" className="iconItchIo"/>
        <img src="/resources/icons/IconLinkedin.png" alt="Linkedin icon" className="iconLinkedin"/>
      </aside>
      <article>
        <address>
          <p>{texts[0].text}</p>
          <a href="mailto:tristan.leger.87@gmail.com">tristan.leger.87@gmail.com</a>
        </address>
        <address>
          <p>{texts[1].text}</p>
          <a href="https://a-stry.itch.io/">https://a-stry.itch.io/</a>
        </address>
        <address>
          <p>{texts[2].text}</p>
          <a href="https://www.linkedin.com/in/tristan-l%C3%A9ger-4444101a2/">https://www.linkedin.com</a>
        </address>
      </article>
    </section>
  );
}

export default Contacts;