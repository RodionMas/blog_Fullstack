import React from "react";
import profileImg from "../../../assets/img/meme.png";

const BlogIdComment: React.FC = () => {
  return (
    <div className="BlogIdComment-wrapper">
      <h2>Комментарии</h2>
      <div className="profile-comment">
        <div className="profile-comment-about">
          <img
            className="profile-comment-user"
            src={profileImg}
            alt="User"
          />
          <div className="about-profile-user">
            <span className="user-name">Алексей Иванов</span>
            <p className="user-text">Это тестовый комментарий 69919</p>
          </div>
        </div>
        <div className="comment-me">
          <img src={profileImg} alt="user-image" />
          <div className="comment-me-text">
            <textarea placeholder="Написать комментарий" className="text-area" name="" id=""></textarea>
            <button className="send-comment">Отправить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogIdComment;
