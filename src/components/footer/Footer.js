import React from 'react';
import useTranslation from '../../hooks/useTranslation';
import LanguagesDropdownComponent from '../languagesDropdown/LanguagesDropdown';
import "./Footer.css";

function Footer()
{
    const year = new Date().getFullYear();
    const texts = useTranslation('Footer');

    return(
        <footer className="main-footer">
            <div className="footer-content">
                <div className="footer-left">
                    <p>{year} - Copyright Tristan LEGER - {texts.Rights}</p>
                    <p className="attribution">{texts.Icons}<a href="https://www.freepik.com" title="Freepik" target="_blank" rel="noreferrer">Freepik</a> from Flaticon</p>
                </div>
                <LanguagesDropdownComponent/>
            </div>
        </footer>
    )
}

export default Footer;