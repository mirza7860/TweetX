import React from "react";
import Form from "../../Components/Form/Form.jsx";
import { db } from "../../Utils/Firebase/Firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addUserData } from "../../store/UserSlice.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import TweetX from "../../assets/TweetX.png";
const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function addUser(userData) {
    try {
      const { name, email, password } = userData;
      const docRef = await addDoc(collection(db, "users"), {
        name,
        email,
        password,
      });
      dispatch(addUserData({ name, email, password, userId: docRef.id }));
      toast.success(`👏 Hi, ${name}! Welcome to Tweetx`, {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      navigate("/");
    } catch (error) {
      toast.error(`Error adding user:, ${error.toString()}`);
    }
  }

  return (
    <>
      <div className="image-background container relative flex">
        <div className="logo">
          <img src={TweetX} alt="TweetX Logo" />
        </div>
        <div className="btn">
          <button className="btn-primary">
            <Link to="/login">Login</Link>
          </button>
        </div>
        <h1 className="bigText">Create Account</h1>

        <div className="SignUp-Form">
          <Form onSubmit={addUser} fields={["name", "email", "password"]} />
        </div>
      </div>
    </>
  );
};

export default SignUp;
