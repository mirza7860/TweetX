import "./FollowingFollower.css";
import userImage from "../../assets/user.jpg";

const FollowingFollower = ({name,following}) => {
  return (
    <div className="user-profile-card">
      <div className="profile-image">
        <img src={userImage} alt="Profile Picture" />
      </div>
      <div className="user-details">
        <h2>{name}</h2>
        <div className="follower-following">
          <div className="following">
            <strong>
              <b className="key">Following</b> :
              {following ? following : 0}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowingFollower;
