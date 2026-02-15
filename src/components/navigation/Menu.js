import React, { useState, useContext, useEffect } from 'react';
import LanguageContext from '../languagesDropdown/LanguagesContext';
import "./Menu.css";

function Menu({ pages }) {
    const { currentLanguage } = useContext(LanguageContext);
    const [texts, setTexts] = useState(Array(100).fill({}));

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "resources/json/Menu.json")
            .then(response => response.json())
            .then(data => setTexts(data[currentLanguage.value]))
            .catch(error => console.error(error));
    }, [currentLanguage]);

    return (
        <nav>
            <ul>
                {pages.map(page => (
                    <li key={page.textIndex}>
                        <a href={page.link} className="link">
                            {texts[page.textIndex]?.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Menu;