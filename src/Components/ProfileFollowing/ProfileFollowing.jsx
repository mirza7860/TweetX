import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../Utils/Firebase/Firebase";
import FollowingFollower from "../FollowingFollower.jsx/FollowingFollower";

const ProfileFollowing = () => {
  const user = useSelector((state) => state.User.User);
  const [Followings, setFollowings] = useState([]);

  useEffect(() => {
    async function userFollowing() {
      const userRef = doc(db, "users", user.userId);
      const userData = await getDoc(userRef);

      const userFollowings = userData.data()?.following || [];
      setFollowings(userFollowings);
    }

    userFollowing();
  }, [user.userId]);

  return (
    <>
      {Followings.length > 0 ? (
        Followings.map((user) => (
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

export default ProfileFollowing;
