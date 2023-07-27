import React, {useState, useContext, useEffect} from 'react';
import LanguageContext from '../../languagesDropdown/LanguagesContext';
import "./MobileMenu.css";

// ====================== COMPONENTS ===================
import { Link } from 'react-router-dom';
// =====================================================

function MobileMenu({pages})
{
    const { currentLanguage } = useContext(LanguageContext);
    const [ texts, setTexts ] = useState(Array(100).fill({}));
    const [ displayMenu, setDisplayMenu ] = useState(false);
    const [ displayAtLeastOnce, SetDisplayAtLeastOnce] = useState(false);

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "resources/json/Menu.json")
        .then(response => response.json())
        .then(data => setTexts(data[currentLanguage.value]))
        .catch(error => console.error(error));
    }, [currentLanguage]);

    const UpdateDisplayMenu = () =>
    {
        SetDisplayAtLeastOnce(true);
        setDisplayMenu(!displayMenu);
    } 

    return(
        <nav>
            <div>
                <img src="resources/icons/iconArrow.png" alt="Arrow icon"  className={displayMenu ? "arrowIconVisibleState" : "arrowIconHiddenState"} onClick={UpdateDisplayMenu}/>
            </div>
            
            <ul className={displayMenu ? 'visibleMenu' : 'hiddenMenu'}>
                <hr/>
                    {displayAtLeastOnce && Array.isArray(pages) &&
                        pages.map((page) => (
                        <React.Fragment key={page.textIndex}>
                        <li>
                            <Link to={page.link}>
                                {texts[page.textIndex].text}
                            </Link>
                        </li>
                    <hr />
                    </React.Fragment>
                ))}
            </ul>
        </nav>
    )
}

export default MobileMenu;