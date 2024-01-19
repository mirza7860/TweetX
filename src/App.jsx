import "./App.css";
import Login from "./Pages/LogIn/LogIn.jsx";
import SignUp from "./Pages/SignUp/SignUp.jsx";
import Feed from "./Pages/Feed/Feed.jsx";
import { ProfileRoutes } from "./Pages/Profile/Profile.jsx";
import Users from "./Pages/Users/Users.jsx";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.User.User);
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {Object.keys(user).length === 0 ? (
            <Route path="/login" element={<Login />} />
          ) : (
            <Route path="/" element={<Feed />} />
          )}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile/*" element={<ProfileRoutes />} />
          <Route path="/users" element={<Users />} />
          <Route
            path="*"
            element={
              <Navigate
                to={Object.keys(user).length === 0 ? "/login" : "/"}
                replace
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
