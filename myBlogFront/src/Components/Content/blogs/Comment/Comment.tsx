import React from "react";
import profileImg from "../../../../assets/img/meme.png";

const Comment: React.FC = () => {
  return (
    <section className="wrapper-comment">
      <h2>Комментарии</h2>
      <div className="profile-container">
        <img src={profileImg} alt="profile-image" />
        <div className="about-comment">
          <span className="comment-author-name">Вася Пупкин</span>
          <span className="comment-author-text">
            Это тестовый комментарийЭто тестовый комментарийЭто тестовый
            комментарийЭто тестовый комментарий
          </span>
        </div>
      </div>
    </section>
  );
};

export default Comment;
