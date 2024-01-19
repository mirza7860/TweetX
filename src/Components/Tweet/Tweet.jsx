import React from "react";
import useTimeAgo from "../../hooks/useTimeAgo";
import "./Tweet.css";
import User  from "../../assets/user.jpg"
const Tweet = ({ Username, date, postContent }) => {
  const timeAgo = useTimeAgo(date);
  return (
    <div className="tweet">
      <img src={User} alt="User Avatar" />
      <div className="content-complete">
        <div className="name-time">
          <div>{Username ? Username : "unknown"}</div>
          <div>{timeAgo ? timeAgo : "just now"}</div>
        </div>
        <div className="content-box text">
          {postContent
            ? postContent
            : "No Text"}
        </div>
      </div>
    </div>
  );
};

export default Tweet;
