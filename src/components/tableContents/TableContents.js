import React, { useState, useEffect } from 'react';
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
        const headingElements = Array.from(
            document.querySelectorAll(".postContent h1, .postContent h2")
        );
        const newNestedHeadings = getNestedHeadings(headingElements);
        setNestedHeadings(newNestedHeadings);
    }, [contentTrigger]);

    return { nestedHeadings };
};

const Headings = ({ headings }) => (
    <ul>
        {headings.map((heading) => (
            <li key={heading.id}>
                <a href={`#${heading.id}`}>{heading.title}</a>
                {heading.items.length > 0 && (
                    <ul>
                        {heading.items.map((child) => (
                            <li key={child.id}>
                                <a href={`#${child.id}`}>{child.title}</a>
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        ))}
    </ul>
);

function TableContents({ contentTrigger }) {
    const { nestedHeadings } = useHeadingsData(contentTrigger);

    return (
        <nav className="tableContents">
            <Headings headings={nestedHeadings} />
        </nav>
    );
}

export default TableContents;