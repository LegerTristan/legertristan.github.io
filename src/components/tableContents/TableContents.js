import { useState, useEffect } from 'react';
import './TableContents.css';

const getNestedHeadings = (headingElements) => {
    const nestedHeadings = [];
    headingElements.forEach((heading) => {
        const { innerText: title, id } = heading;
        if (heading.nodeName === "H1") {
            nestedHeadings.push({ id, title, items: [] });
        } else if (heading.nodeName === "H2" && nestedHeadings.length > 0) {
            nestedHeadings[nestedHeadings.length - 1].items.push({ id, title });
        }
    });
    return nestedHeadings;
};

const useHeadingsData = (contentTrigger) => {
    const [nestedHeadings, setNestedHeadings] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const headingElements = Array.from(
                document.querySelectorAll(".postContent h1, .postContent h2")
            );

            const newNestedHeadings = getNestedHeadings(headingElements);

            setNestedHeadings(newNestedHeadings);
        }, 100); 

        return () => clearTimeout(timer);
    }, [contentTrigger]);

    return { nestedHeadings };
};

const Headings = ({ headings }) => {
    const handleScroll = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <ul>
            {headings.map((heading) => (
                <li key={heading.id}>
                    <a 
                        href={`#${heading.id}`} 
                        onClick={(e) => handleScroll(e, heading.id)}
                    >
                        {heading.title}
                    </a>
                    {heading.items.length > 0 && (
                        <ul>
                            {heading.items.map((child) => (
                                <li key={child.id}>
                                    <a 
                                        href={`#${child.id}`}
                                        onClick={(e) => handleScroll(e, child.id)}
                                    >
                                        {child.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
};

function TableContents({ contentTrigger }) {
    const { nestedHeadings } = useHeadingsData(contentTrigger);

    if (nestedHeadings.length === 0) return null;

    return (
        <nav className="tableContents">
            <Headings headings={nestedHeadings} />
        </nav>
    );
}

export default TableContents;