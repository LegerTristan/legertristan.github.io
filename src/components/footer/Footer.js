import React, {useState, useContext, useEffect} from 'react';
import LanguagesDropdown from '../languagesDropdown/LanguagesContext'; // Correction du chemin si nécessaire
import LanguageContext from '../languagesDropdown/LanguagesContext';
import LanguagesDropdownComponent from '../languagesDropdown/LanguagesDropdown'; // Import du composant réel
import "./Footer.css";

function Footer()
{
    const year = new Date().getFullYear();
    const { currentLanguage } = useContext(LanguageContext);
    const [ texts, setTexts ] = useState(Array(1).fill({}));

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "resources/json/Footer.json")
        .then(response => response.json())
        .then(data => setTexts(data[currentLanguage.value]))
        .catch(error => console.error(error));
    }, [currentLanguage]);

    return(
        <footer className="main-footer">
            <div className="footer-content">
                <div className="footer-left">
                    <p>{year} - Copyright Tristan LEGER - {texts[0]?.text}</p>
                    <p className="attribution">{texts[1]?.text}<a href="https://www.freepik.com" title="Freepik" target="_blank" rel="noreferrer">Freepik</a> from Flaticon</p>
                </div>
                <LanguagesDropdownComponent/>
            </div>
        </footer>
    )
}

export default Footer;