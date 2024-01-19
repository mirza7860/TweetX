import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../Utils/Firebase/Firebase";
import FollowingFollower from "../FollowingFollower.jsx/FollowingFollower";

const ProfileFollowers = () => {
  const user = useSelector((state) => state.User.User);
  const [Followers, setFollowers] = useState([]);

  useEffect(() => {
    async function userFollowing() {
      const userRef = doc(db, "users", user.userId);
      const userData = await getDoc(userRef);
      console.log(userData.data());
      const userFollowers = userData.data()?.followers || [];
      setFollowers(userFollowers);
    }

    userFollowing();
  }, []);

  return (
    <>
      {Followers.length > 0 ? (
        Followers.map((user) => (
          <FollowingFollower
            key={user.id}
            name={user.name}
          />
        ))
      ) : (
        <p>You have no followings.</p>
      )}
    </>
  );
};

export default ProfileFollowers;
