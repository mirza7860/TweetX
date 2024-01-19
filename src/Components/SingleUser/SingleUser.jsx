import React, { useEffect, useState } from "react";
import userImage from "../../assets/user.jpg";
import { db } from "../../Utils/Firebase/Firebase";
import {
  updateDoc,
  doc,
  arrayRemove,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./SingleUser.css";

const SingleUser = ({ name, id, setRedirect }) => {
  const user = useSelector((state) => state.User.User);
  const [isFollowing, setisFollowing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFollowState = async () => {
      try {
        const userRef = doc(db, "users", user.userId);
        const userDoc = await getDoc(userRef);
        const userFollowing = userDoc.data().following || [];
        const isAlreadyFollowing = userFollowing.some(
          (follower) => follower.userId === id
        );
        setisFollowing(isAlreadyFollowing);
      } catch (error) {
        console.error("Error fetching follow state:", error.message);
      }
    };
    fetchFollowState();
  }, [id, user.userId]);

  async function FollowHandle() {
    const userRef = doc(db, "users", user.userId);
    const WhomToFollowRef = doc(db, "users", id);

    try {
      await updateDoc(userRef, {
        following: arrayUnion({ userId: id, name: name }),
      });

      await updateDoc(WhomToFollowRef, {
        followers: arrayUnion({ userId: user.userId, name: user.name }),
      });

      navigate("/users");
      setisFollowing(true);
      setRedirect(true);
    } catch (error) {
      console.error("Error updating following:", error.message);
      toast.error("An error occurred. Please try again.");
    }
  }
  async function UnfollowHandle() {
    const userRef = doc(db, "users", user.userId);
    const WhomToUnfollowRef = doc(db, "users", id);

    try {
      await updateDoc(userRef, {
        following: arrayRemove({ userId: id, name: name }),
      });

      await updateDoc(WhomToUnfollowRef, {
        followers: arrayRemove({ userId: user.userId, name: user.name }),
      });
      navigate("/users");
      setisFollowing(false);
      setRedirect(true);
      toast.success(`You have unfollowed ${name}`);
    } catch (error) {
      console.error("Error updating following:", error.message);
      toast.error("An error occurred. Please try again.");
    }
  }

  return (
    <div className="user-profile">
      <div className="profile-image">
        <img src={userImage} alt="Profile Picture" />
      </div>
      <div className="user-details">
        <h2>{name ? name : "Unknown"}</h2>
      </div>
      <div>
        {isFollowing ? (
          <button className="unfollow-button" onClick={UnfollowHandle}>
            Unfollow
          </button>
        ) : (
          <button className="follow-button" onClick={FollowHandle}>
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleUser;
