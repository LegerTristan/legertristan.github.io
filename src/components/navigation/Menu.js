import React, {useState, useContext, useEffect} from 'react';
import LanguageContext from '../languagesDropdown/LanguagesContext';
import "./Menu.css";

// ====================== COMPONENTS ===================
import { Link } from 'react-router-dom';
// =====================================================

function Menu({pages})
{
    const { currentLanguage } = useContext(LanguageContext);
    const [ texts, setTexts ] = useState(Array(100).fill({}));

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "resources/json/Menu.json")
        .then(response => response.json())
        .then(data => setTexts(data[currentLanguage.value]))
        .catch(error => console.error(error));
    }, [currentLanguage]);

    return(         // Galère 1 : Si tu mets la parenthèse à la ligne suivante, le JSX n'est pas détecté :)
        <nav>
            <ul>
                {
                    pages.map(page => <li key={page.textIndex}><Link to={page.link}>{texts[page.textIndex].text}</Link></li>)
                }
            </ul>
        </nav>
    )
}

export default Menu;