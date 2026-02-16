import useTranslation from '../../hooks/useTranslation';
import Post from './post/Post';
import postsData from './PostsData';
import './Posts.css';

function Posts() {
  const texts = useTranslation('Posts');

  return (
    <section className="posts">
      {/* {
        postsData.map(postData => (
          <Post 
            key={postData.titleId}
            title={texts[postData.titleId]} 
            description={texts[postData.descriptionId]}
            link={postData.link} 
            date={texts[postData.dateId]}
          />
        ))
      } */}
    </section>
  );
}

export default Posts;