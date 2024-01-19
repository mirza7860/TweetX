import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import SingleUser from "../../Components/SingleUser/SingleUser";
import { db } from "../../Utils/Firebase/Firebase";
import { getDocs, collection } from "firebase/firestore";
import { useSelector } from "react-redux";
const Users = () => {
  const [allUsers, setallUsers] = useState([]);
  const [Redirect, setRedirect] = useState(false);
  const AccountCheck = useSelector((state) => state.User.User);
  async function fetchAllUsers() {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const filteredUsers = users.filter(
      (user) => user.email !== AccountCheck.email
    );
    console.log(filteredUsers);
    setallUsers(filteredUsers);
  }
  useEffect(() => {
    fetchAllUsers();
    setRedirect(false);
  }, []);
  return (
    <>
      <Navbar />
      {allUsers.map((user) => (
        <SingleUser {...user} key={user.userId} setRedirect={setRedirect} />
      ))}
    </>
  );
};

export default Users;
