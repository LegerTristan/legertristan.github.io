import React, { useState, useContext, useEffect } from 'react';
import Select from 'react-select';
import languagesData from './LanguagesData';
import LanguageContext from './LanguagesContext';
import "./LanguagesDropdown.css";

function LanguagesDropdown()
{
    const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);
    const [ texts, setTexts ] = useState(Array(100).fill({}));

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "resources/json/LanguagesDropdown.json")
        .then(response => response.json())
        .then(data => setTexts(data[currentLanguage.value]))
        .catch(error => console.error(error));
    }, [currentLanguage]);

    const formatGroupLabel = (language) => (        // Galère 5: Même code qu'en dessous mais ça ne marchait pas avant :)
        <div className="LanguageFlag">
            <img src={language.img} alt={language.alt} />
        </div>
    );

    return(
        <div className="LanguagesDropdown">
            <p>{texts[0].text}</p>
            <Select
                options={languagesData}
                defaultValue={currentLanguage}
                formatOptionLabel={formatGroupLabel}
                onChange={(selectedOption) => setCurrentLanguage(selectedOption)}
             />
        </div>
    )
}

export default LanguagesDropdown;