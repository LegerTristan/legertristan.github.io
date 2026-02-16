import useTranslation from '../../hooks/useTranslation';
import Post from './post/Post';
import postsData from './PostsData';
import './Posts.css';

function Posts() {
  const texts = useTranslation('Posts');

  return (
    <section className="posts">
      {
        postsData.map(postData => (
          <Post 
            key={postData.titleIndex}
            title={texts[postData.titleIndex]?.text} 
            description={texts[postData.descriptionIndex]?.text}
            link={postData.link} 
            date={texts[postData.dateIndex]?.text}
          />
        ))
      }
    </section>
  );
}

export default Posts;