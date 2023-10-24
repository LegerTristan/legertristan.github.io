// ====================== COMPONENTS ===================
import { Link } from 'react-router-dom';
import './Post.css'

function Post({title, description, link, date})
{


    return ( 
        <Link to={link}>
            <article className="postArticle">
                <p className="publishingDate">{date}</p>
                <h2>{title}</h2>
                <p>{description}</p>
                <hr/>
            </article>
        </Link>
    );
}

export default Post;