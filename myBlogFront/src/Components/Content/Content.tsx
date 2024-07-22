import React from "react";
import LinkBlogs from "./blogs/LinkBlogs";
import Tags from "./blogs/Tags/Tags";
import Comment from "./blogs/Comment/Comment";
import { Outlet } from "react-router-dom";

const Content: React.FC = () => {
  return (
    <section className="wrapper-content">
      <LinkBlogs />
      <div className="flex-content">
        <Outlet />
        <div>
          <Tags />
          <Comment />
        </div>
      </div>
    </section>
  );
};

export default Content;
