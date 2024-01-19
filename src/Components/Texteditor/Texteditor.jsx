import React, {  useState } from "react";
import { useSelector } from "react-redux";
import "./Texteditor.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../Utils/Firebase/Firebase";
import { addDoc, collection } from "firebase/firestore";
const TextEditor = ({isEditorOpen,setEditorOpen}) => {
  const [inputValue, setInputValue] = useState("");
  const user = useSelector((state) => state.User.User);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const trimmedInput = inputValue.trim();

    if (trimmedInput === "") {
      toast.error("❌ Post content cannot be empty!", {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      setInputValue("");
      return;
    }
    const { name } = user;
    const postRef = await addDoc(collection(db, "posts"), {
      Username: name,
      postContent: inputValue,
      date: Date.now(),
    });
    if (postRef.id) {
      toast.success(
        `👏 Hi, ${name}! Congratulation 🎉 , Your tweetx post is public . `,
        {
          position: toast.POSITION.TOP_CENTER,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        }
      );
    }

    navigate("/");
    setInputValue("");
    setEditorOpen(false);
  };

  return (
    <>
      <div className="button">
        <button onClick={() => setEditorOpen(true)} className="write-button">
          WRITE
        </button>
      </div>
      {isEditorOpen && (
        <div className="popup-overlay">
          <div className="popup-container">
            <button
              onClick={() => setEditorOpen(false)}
              className="close-button"
            >
              X CLOSE
            </button>
            <textarea
              rows={8}
              placeholder="Type your post here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleSubmit} className="post">
              POST
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TextEditor;
