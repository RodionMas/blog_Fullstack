import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { selectAuth } from "../../Selectors/selectors";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/PostsSlice";
import { fetchCreate } from "../../store/AuthSlice";
import axios from "../../instanceAxios";
import closeImg from "../../assets/img/close.png";
import MessageDel from "../MessageDel/MessageDel";
import { createPostData } from "../../types/types";

const CreatePost: React.FC = () => {
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  const appDispatch = useAppDispatch();
  const [value, setValue] = React.useState<string>("");
  const [tags, setTags] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const [img, setImg] = React.useState<string>("");
  const [del, setDel] = React.useState<boolean>(false);
  const { token } = useSelector(selectAuth).user;
  const quillRef = React.useRef<any>(null);
  const inpRef = React.useRef<any>(null);
  const navigate = useNavigate()
  if (!token) {
    return <Navigate to={`/login`} />;
  }
  const wantDel = () => {
    setImg("");
    setDel(false);
  };
  const handleChange = async (e: any) => {
    try {
      const formData = new FormData();
      const targetFiles: string = e.target.files[0];
      formData.append("image", targetFiles);
      const { data } = await axios.post("/upload", formData);
      setImg(data.url);
    } catch (error) {
      console.warn(error);
    }
  };
  const handleSave = async () => {
    const editor = quillRef.current.getEditor();
    const plainText = editor.getText().trim();
    const postData: createPostData = {
      title,
      tags: tags.split(" "),
      text: plainText,
    };
    if (img) {
        postData.imageUrl = `http://localhost:4444${img}` 
        const data = await appDispatch(fetchCreate(postData));
        navigate('/new')
        return data;
    }
    const data = await appDispatch(fetchCreate(postData));
    navigate('/new')
    return data
  };
  return (
    <div className="create-post">
      <div className="title-block">
        <button onClick={() => inpRef.current.click()} className="load-preview">
          Загрузить превью
        </button>
        <input
          onChange={(e) => handleChange(e)}
          type="file"
          ref={inpRef}
          hidden
        />
        {img && (
          <img
            className="post-img"
            src={`http://localhost:4444${img}`}
            alt="post"
          />
        )}
        {img && (
          <img
            onClick={() => setDel(true)}
            className="close"
            src={closeImg}
            alt="close"
          />
        )}

        {del && <MessageDel setDel={setDel} wantDel={wantDel} />}
        <input
          onChange={(e) => setTitle(e.target.value)}
          className="title-post-create"
          type="text"
          placeholder="Заголовок статьи..."
        />
        <input
          onChange={(e) => setTags(e.target.value)}
          className="tags-post-create"
          type="text"
          placeholder="Теги"
        />
      </div>
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        placeholder="Введите текст..."
      />
      <button className="handle-save" onClick={handleSave}>
        Отправить
      </button>
    </div>
  );
};

export default CreatePost;
