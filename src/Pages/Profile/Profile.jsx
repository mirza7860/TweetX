import React from "react";
import { Routes, Route } from "react-router-dom";
import ProfilePageOutlet from "../../Outlet/ProfileOutlet.jsx";
import ProfileFollowing from "../../Components/ProfileFollowing/ProfileFollowing.jsx";
import ProfilePosts from "../../Components/ProfilePosts/ProfilePosts.jsx";
import ProfileFollowers from "../../Components/ProfileFollowers/ProfileFollowers.jsx";
import "./Profile.css";
const Profile = () => {
  return (
    <div className="container">
      <ProfilePageOutlet />
    </div>
  );
};
const ProfileRoutes = () => {
  return (
    <>
      <ProfilePageOutlet />
      <Routes>
        <Route path="/" element={<ProfilePosts />} />
        <Route path="followers" element={<ProfileFollowers />} />
        <Route path="following" element={<ProfileFollowing />} />
      </Routes>
    </>
  );
};

export { ProfileRoutes, Profile };
