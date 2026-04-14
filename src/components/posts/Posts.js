import useTranslation from '../../hooks/useTranslation';
import Post from './post/Post';
import postsData from './PostsData';
import './Posts.css';

function Posts() {
  const texts = useTranslation('Posts');
  const reversedPosts = [...postsData].reverse();

  return (
    <section className="posts">
      {reversedPosts.map(postData => (
        <Post 
          key={postData.id}
          title={texts[postData.titleId]} 
          description={texts[postData.descriptionId]}
          link={`/posts/${postData.id}`} 
          date={texts[postData.dateId]}
        />
      ))}
    </section>
  );
}

export default Posts;