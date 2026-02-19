import React from 'react';
import { HashLink } from 'react-router-hash-link';
import useTranslation from '../../hooks/useTranslation';
import LanguagesDropdown from '../languagesDropdown/LanguagesDropdown';
import "./Menu.css";

function Menu({ pages }) {
    const texts = useTranslation('Menu');

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-links-wrapper">
                    <ul>
                        {pages.map(page => (
                            <li key={page.titleId}>
                                <HashLink 
                                    smooth 
                                    to={page.link} 
                                    className="link"
                                >
                                    {texts[page.titleId]}
                                </HashLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="nav-languages-wrapper">
                    <LanguagesDropdown />
                </div>
            </div>
        </nav>
    );
}

export default Menu;