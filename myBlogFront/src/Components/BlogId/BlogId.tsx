import React from "react";
import profileImg from "../../assets/img/meme.png";
import eye from "../../assets/img/eye.svg";
import comment from "../../assets/img/comment.svg";
import BlogIdComment from "./BlogIdComment/BlogIdComment";
import { useAppDispatch } from "../../store/PostsSlice";
import { useParams } from "react-router-dom";
import { createPostDate } from "../../utils/createPostDate";
import axios from '../../instanceAxios'

const BlogId: React.FC = () => {
  const tags: string[] = ["#react", "#fun", "#typescript"];
  const appDispatch = useAppDispatch();
  const { id } = useParams();
  const [post, setPost] = React.useState<any>()
  React.useEffect(() => {
    axios.get(`posts/${id}`).then(res => setPost(res.data)).catch((e) => {
      console.warn(e)
    })
  }, []);
  return (
    <section className="blog-id">
      {post && <div className="blog-id-wrapper">
        <img src={post.imageUrl} alt="Post" />
        <div className="blog-id-top-content">
          <div className="who-post">
            <img className="profile-img" src={profileImg} alt="user" />
            <div>
              <span className="author">Relf</span>
              <span className="post-date">{post.createdAt && createPostDate(post.createdAt)}</span>
            </div>
          </div>
          <div className="blog-all-text">
            <h1>{post.title}</h1>
            <div className="tags-author">
              {post.tags?.map((el: string, i: number) => {
                return (
                  <span key={i} className="tag-el">
                    {`#${el}`}
                  </span>
                );
              })}
            </div>
            <div className="post-text-views">
              <p className="text-for-post">
                {post.text}
              </p>
              <div className="comment-blog">
                <img src={eye} alt="views-count" />
                <span className="views-count-text">{post.viewsCount}</span>
                <img className="comment-img" src={comment} alt="comment" />
                <span className="views-count-text">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>}

      <div className="blog-id-bot-comment">
        <BlogIdComment />
      </div>
    </section>
  );
};

export default BlogId;
