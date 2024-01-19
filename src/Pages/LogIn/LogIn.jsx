import React from "react";
import Form from "../../Components/Form/Form.jsx";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Utils/Firebase/Firebase.js";
import { toast } from "react-toastify";
import "./LogIn.css";
import TweetX from "../../assets/TweetX.png";
const Login = () => {
  const router = useNavigate();
  async function LoginUser(userdata) {
    try {
      const { email, password } = userdata;
      const querySnapshot = await getDocs(collection(db, "users"));
      const users = querySnapshot.docs.map((doc) => doc.data());
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        toast.success(`👏 Hi, ${user.name}! You are logged in. `, {
          position: toast.POSITION.TOP_CENTER,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
        router("/");
      } else {
        toast.error(`You are not logeed in . Signup First`, {
          position: toast.POSITION.TOP_CENTER,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
        router("/signup");
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  }

  return (
    <>
      <div className="image-background container relative flex">
        <div className="logo">
          <img src={TweetX} alt="TweetX Logo" />
        </div>
        <div className="btn">
          <button className="btn-secondary">
            <Link to="/signup"> Create Account</Link>
          </button>
        </div>
        <h1 className="bigText">Login</h1>

        <div className="LogIn-Form">
          <Form onSubmit={LoginUser} fields={["email", "password"]} />
        </div>
      </div>
    </>
  );
};

export default Login;
