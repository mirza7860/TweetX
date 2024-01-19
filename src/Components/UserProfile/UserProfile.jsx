import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./UserProfile.css";
import userImage from "../../assets/user.jpg";

const UserProfile = () => {
  const fetchedUserData = useSelector((state) => state.User.User);
  const [userData, setUserData] = useState(fetchedUserData);

  useEffect(() => {
    setUserData(fetchedUserData);
  }, [fetchedUserData]);

  return (
    <div className="user-profile-card">
      <div className="profile-image">
        <img src={userImage} alt="Profile Picture" />
      </div>
      <div className="user-details">
        <h2>{userData.name}</h2>
        <div className="follower-following">
          <div className="post-number">
            <strong>
              <b className="key">Posts</b> :
              {userData.posts ? userData.posts : 0}
            </strong>
          </div>
          <div className="follower">
            <strong>
              <b className="key">Followers</b> :
              {userData.followers ? userData.followers : 0}
            </strong>
          </div>
          <div className="following">
            <strong>
              <b className="key">Following</b> :
              {userData.following ? userData.following : 0}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
