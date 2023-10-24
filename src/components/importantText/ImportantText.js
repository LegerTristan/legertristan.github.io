import React from 'react';
import './ImportantText.css';

function ImportantText({ text, children })
{
    const parts = text !== undefined ? text.split("\n") : [];

    return(
        <p className='importantText'>
            {parts.map((sentence, index) => <span key={index}>
                                                {sentence}
                                                {index == parts.length - 1 ? "" : <br />}
                                            </span>)}
            {children}
        </p>
    );
    
}

export default ImportantText;