import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import LanguageContext from '../languagesDropdown/LanguagesContext';
import TableContents from '../tableContents/TableContents';
import './PostReflection.css'; 

const flatten = (text, child) => {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
};

function PostDetail() {
    const { postId } = useParams();
    const { currentLanguage } = useContext(LanguageContext);
    const [markdown, setMarkdown] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const languageSuffix = currentLanguage.value === 'french' ? 'fr' : 'en';
                const response = await fetch(`${process.env.PUBLIC_URL}/resources/posts/${postId}_${languageSuffix}.md`);
                
                if (!response.ok) {
                    throw new Error("Post introuvable");
                }
                
                const text = await response.text();
                setMarkdown(text);
            } catch (err) {
                console.error(err);
                navigate('/posts'); 
            }
        };

        fetchPost();
    }, [postId, currentLanguage, navigate]);

    if (!markdown) return null;

    const components = {
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter
                    style={darcula}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        },
        img({ src, alt }) {
            return (
                <figure className="post-figure">
                    <img src={`${process.env.PUBLIC_URL}/${src}`} alt={alt} />
                    <figcaption>{alt}</figcaption>
                </figure>
            );
        },
        h1: ({ children }) => {
            const text = React.Children.toArray(children).reduce(flatten, '');
            const slug = text.toLowerCase().replace(/\W/g, '-');
            return <h1 id={slug}>{children}</h1>;
        },
        h2: ({ children }) => {
            const text = React.Children.toArray(children).reduce(flatten, '');
            const slug = text.toLowerCase().replace(/\W/g, '-');
            return <h2 id={slug}>{children}</h2>;
        },
        blockquote: ({children}) => {
            return <div className="important-text-block">{children}</div>
        }
    };

    return (
        <section className="postContent">
            <TableContents contentTrigger={markdown} />
            <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={components}
            >
                {markdown}
            </ReactMarkdown>
        </section>
    );
}

export default PostDetail;