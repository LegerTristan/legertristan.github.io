import React, { useState, useContext, useEffect} from 'react';
import LanguageContext from '../languagesDropdown/LanguagesContext';
import Post from './post/Post';

// =============   Datas  ===================
import postsData from './PostsData';
import './Posts.css';

function Posts() {
  const { currentLanguage } = useContext(LanguageContext);
  const [ texts, setTexts ] = useState(Array(3).fill({})); 

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "resources/json/Posts.json")
    .then(response => response.json())
    .then(data => setTexts(data[currentLanguage.value]))
    .catch(error => console.error(error));
  }, [currentLanguage]);

  return (
    <section className="posts">
      {
        postsData.map
        (
          postData => <Post key={postData.titleIndex}
            title={texts[postData.titleIndex].text} 
            description={texts[postData.descriptionIndex].text}
            link={postData.link} date={texts[postData.dateIndex].text}
            />
        )
      }

    </section>
  );
}

export default Posts;