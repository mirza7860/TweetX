import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileTab.css";

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/profile/${tab}`);
  };

  return (
    <div className="profile-tabs">
      <button
        className={`tab ${activeTab === "profile" ? "active" : ""}`}
        onClick={() => {
          navigate("/profile");
          setActiveTab("profile");
        }}
      >
        Post
      </button>
      <button
        className={`tab ${activeTab === "followers" ? "active" : ""}`}
        onClick={() => handleTabClick("followers")}
      >
        Followers
      </button>
      <button
        className={`tab ${activeTab === "following" ? "active" : ""}`}
        onClick={() => handleTabClick("following")}
      >
        Following
      </button>
    </div>
  );
};

export default ProfileTabs;
