import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import UserProfile from "../Components/UserProfile/UserProfile";
import ProfileTabs from "../Components/ProfileTab/ProfileTab";
export default function ProfilePageOutlet() {
  return (
    <>
      <Navbar />
      <UserProfile />
      <ProfileTabs />
      <Outlet />
    </>
  );
}
