import { HashLink } from 'react-router-hash-link';
import useTranslation from '../../hooks/useTranslation';
import "./Menu.css";

function Menu({ pages }) {
    const texts = useTranslation('Menu');

    return (
        <nav>
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
        </nav>
    );
}

export default Menu;