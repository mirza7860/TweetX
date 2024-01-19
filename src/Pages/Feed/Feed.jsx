import React, { useEffect, useState } from "react";
import TextEditor from "../../Components/TextEditor/TextEditor.jsx";
import Navbar from "../../Components/Navbar/Navbar";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from "../../Utils/Firebase/Firebase";
import Tweet from "../../Components/Tweet/Tweet";
import { Audio } from "react-loader-spinner";
import "./Feed.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [isEditorOpen, setEditorOpen] = useState(false);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postRef = await getDocs(
          query(collection(db, "posts"), orderBy("date", "desc"))
        );
        const allPosts = postRef.docs.map((doc) => doc.data());
        setPosts(allPosts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [isEditorOpen]);
  return (
    <>
      <Navbar />
      <TextEditor {...{ isEditorOpen, setEditorOpen }} />
      {Loading ? (
        <Loader />
      ) : (
        <div className="Tweets">
          {posts.map((post, index) => (
            <Tweet key={index} {...post} />
          ))}
        </div>
      )}
    </>
  );
};

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Audio
        height="80"
        width="80"
        radius="9"
        color="Pink"
        ariaLabel="loading"
      />
    </div>
  );
};

export default Feed;
