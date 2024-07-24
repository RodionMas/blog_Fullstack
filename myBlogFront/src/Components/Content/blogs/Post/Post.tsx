import React from "react";
import cat from "../../../../assets/img/1adad5db-32abce0073070dd6bbc9eeb3429e194d.png";
import profileImg from "../../../../assets/img/meme.png";
import eye from "../../../../assets/img/eye.svg";
import comment from "../../../../assets/img/comment.svg";
import close from "../../../../assets/img/close.png";
import pencil from "../../../../assets/img/pencil.png";
import { Link } from "react-router-dom";
import { createPostDate } from "../../../../utils/createPostDate";
import { post } from "../../../../types/types";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../../Selectors/selectors";
import { fetchPosts, useAppDispatch } from "../../../../store/PostsSlice";
import { fetchRemovePost, fetchUpdate } from "../../../../store/AuthSlice";
const Post: React.FC<post> = ({
  _id,
  imageUrl,
  user,
  createdAt,
  title,
  tags,
  text,
  viewsCount,
}: post) => {
  const id: string = useSelector(selectAuth).user?._id;
  const appDispatch = useAppDispatch()
  return (
    <div className="blog">
      {id === user._id && (
        <div className="edit-post">
          <img onClick={async () => {
            appDispatch(fetchRemovePost(_id))
            appDispatch(fetchPosts());
          }
            } src={close} className="close" alt="close" />
          <Link to={`/update`} onClick={() => appDispatch(fetchUpdate(_id))}>
            <img src={pencil} className="edit" alt="edit" />
          </Link>
        </div>
      )}
      <Link to={`/post/${_id}`}>
        {imageUrl ? (
          <img className="blogs-img" src={imageUrl} alt="blog-image" />
        ) : (
          <img className="blogs-img" src={cat} alt="blog-image" />
        )}
      </Link>
      <div className="blog-description">
        <div className="who-post">
          <img
            className="profile-img"
            src={user.avatarUrl ? `${user.avatarUrl}` : profileImg}
            alt="profile-image"
          />
          <div>
            <span className="author">{user.fullName}</span>
            <span className="post-date">
              {createdAt && createPostDate(createdAt)}
            </span>
          </div>
        </div>
        <div className="blog-all-text">
          <Link className="link-title-blogs" to={`/post/${_id}`}>
            <h1>{title}</h1>
          </Link>
          <div className="tags-author">
            {tags.map((el: string, i: number) => {
              return (
                <span key={i} className="tag-el">
                  {`# ${el}`}
                </span>
              );
            })}
          </div>
          <p className="author-text">{text}</p>
        </div>
        <div className="comment-blog">
          <img src={eye} alt="views-count" />
          <span className="views-count-text">{viewsCount}</span>
          <img className="comment-img" src={comment} alt="comment" />
          <span className="views-count-text">3</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
