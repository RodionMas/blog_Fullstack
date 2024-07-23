import React from "react";

import { fetchPosts, useAppDispatch } from "../../../../store/PostsSlice";
import { useSelector } from "react-redux";
import { selectPosts } from "../../../../Selectors/selectors";
import Post from "../Post/Post";
import { post } from "../../../../types/types";

const BlogsNew: React.FC = () => {
  const appDispatch = useAppDispatch();
  const { posts } = useSelector(selectPosts);
  React.useEffect(() => {
    appDispatch(fetchPosts());
  }, []);
  return (
    <div className="wrapper-blogs">
      {posts &&
        posts.map((post: post) => {
          return (
            <Post key={post._id} {...post} />
          );
        })}
    </div>
  );
};

export default BlogsNew;
