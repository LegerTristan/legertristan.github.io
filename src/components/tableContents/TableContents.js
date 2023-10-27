import React, {useState, useEffect} from 'react';
import './TableContents.css'


const useHeadingsData = () =>
{
    const [nestedHeadings, setNestedHeadings] = useState([]);

    useEffect(() => 
    {
        const headingElements = Array.from(
            document.querySelectorAll("h1, h2")
        );

        console.log("Bordel " + nestedHeadings);

            const newNestedHeadings = getNestedHeadings(headingElements);
            console.log("nestedings " + newNestedHeadings);
            setNestedHeadings(newNestedHeadings);
        

    }, [nestedHeadings]);

    return { nestedHeadings };
}    

const getNestedHeadings = (headingElements) =>
{
    const nestedHeadings = [];
    headingElements.forEach((heading, index) => 
        {
            const {innerText: title, id} = heading;

            if(heading.nodeName === "H1")
            {
                nestedHeadings.push({id, title, items: []});
            }
            else if(heading.nodeName === "H2" && nestedHeadings.length > 0)
            {
                nestedHeadings[nestedHeadings.length - 1].items.push({id, title, });
            }
        });

    return nestedHeadings;
}

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

function TableContents()
{
    const { nestedHeadings } = useHeadingsData();

    return(
        <nav className="tableContents">
            <Headings headings={nestedHeadings} />
        </nav>
    );
    
}

export default TableContents;