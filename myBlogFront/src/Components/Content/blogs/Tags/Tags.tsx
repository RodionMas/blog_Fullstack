import React from "react";
import { fetchTags, useAppDispatch } from "../../../../store/PostsSlice";
import { useSelector } from "react-redux";
import { selectPosts } from "../../../../Selectors/selectors";

const Tags: React.FC = () => {
  // const tags: string[] = ["react", "typescript", "заметки"];
  const appDispatch = useAppDispatch()
  const { tags } = useSelector(selectPosts)
  let uniqTags = tags.reduce((uniq: any, item) => {  
    return uniq.includes(item) ? uniq : [...uniq, item]
  }, [])
  React.useEffect(() => {
    appDispatch(fetchTags())
  }, [])
  return (
    <div className="wrapper-tags">
      <h2>Тэги</h2>
      <ul>
        {uniqTags?.map((el: string, i: number) => {
          return (
            <li key={i} className="tag-list-item">
              <span className="hashtag">
                #<span className="tag-hashtag-name">{el}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tags;
