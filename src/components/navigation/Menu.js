import useTranslation from '../../hooks/useTranslation';
import "./Menu.css";

function Menu({ pages }) {
    const texts = useTranslation('Menu');

    return (
        <nav>
            <ul>
                {pages.map(page => (
                    <li key={page.titleId}>
                        <a href={page.link} className="link">
                            {texts[page.titleId]}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Menu;