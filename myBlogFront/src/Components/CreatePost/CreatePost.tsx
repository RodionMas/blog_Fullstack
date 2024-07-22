import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { selectAuth } from "../../Selectors/selectors";
import { Navigate } from "react-router-dom";

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
    const [value, setValue] = React.useState("");
    const { token } = useSelector(selectAuth).user
    if (!token) {
        return <Navigate to={`/login`} />
    }
    return (
        <div className="create-post">
            <div className="title-block">
                <button className="load-preview">Загрузить превью</button>
                <input className="title-post-create" type="text" placeholder="Заголовок статьи..." />
                <input className="tags-post-create" type="text" placeholder="Теги" />
            </div>
            <ReactQuill
                value={value}
                onChange={setValue}
                modules={modules}
                formats={formats}
                placeholder='Введите текст...'
            />
        </div>
    );
};

export default CreatePost;
