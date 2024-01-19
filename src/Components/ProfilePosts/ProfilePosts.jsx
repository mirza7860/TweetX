import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Audio } from "react-loader-spinner";
import { getDocs, query, collection,  orderBy } from "firebase/firestore";
import { db } from "../../Utils/Firebase/Firebase";
import Tweet from "../Tweet/Tweet";
const ProfilePosts = () => {
  const user = useSelector((state) => state.User.User);
  const [Userposts, setUserposts] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const postRef = await getDocs(
          query(collection(db, "posts"), orderBy("date", "desc"))
        );
        const allPosts = postRef.docs.map((doc) => doc.data());

        const userPosts = allPosts.filter(
          (post) => post.Username === user.name
        );

        setUserposts(userPosts);
        console.log(userPosts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching all posts:", error);
      }
    };

    fetchAllPosts();
  }, [user]);
  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <div className="Tweets">
          {Userposts.map((post, index) => (
            <Tweet key={index} {...post} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProfilePosts;

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
