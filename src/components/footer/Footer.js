import React, {useState, useContext, useEffect} from 'react';
import LanguagesDropdown from '../languagesDropdown/LanguagesDropdown';
import LanguageContext from '../languagesDropdown/LanguagesContext';
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
        <>
            <hr/>
            <footer>
                <p>{year} - Copyright Tristan LEGER - {texts[0].text}</p>
                <LanguagesDropdown/>
            </footer>
        </>
    )
}

export default Footer;