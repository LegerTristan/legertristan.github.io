import React, { useState, useEffect, useContext } from 'react'
import LanguageContext from '../languagesDropdown/LanguagesContext';
import DropdownText from '../dropdownTexts/DropdownText';
import './About.css';

function About() {

  const { currentLanguage } = useContext(LanguageContext);
  const [texts, setTexts] = useState(Array(100).fill({}));

  useEffect(() => {
      fetch(process.env.PUBLIC_URL + "resources/json/About.json")
      .then(response => response.json())
      .then(data => setTexts(data[currentLanguage.value]))
      .catch(error => console.error(error));
  }, [currentLanguage]);

  return (
      <section className="about">
        <article className="ddTextContainer">
          <DropdownText title={texts[0].text}>
          <p className="ddContent" key={texts[1].id}>{texts[1].text}<br />
                {texts[2].text}<br/>
                {texts[3].text}</p>
          </DropdownText>

          <DropdownText title={texts[4].text}>
          <p className="ddContent" key={texts[5].id}>{texts[5].text}<br />
                    {texts[6].text}</p>
          </DropdownText>

          <DropdownText title={texts[7].text}>
          <p className="ddContent" key={texts[8].id}>{texts[8].text}</p>
          </DropdownText>
        </article>
      </section>
  );
}

export default About;
