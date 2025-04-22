import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../Context";
import "./profile.css";
import ProfileImageUpload from "../../ProfileImage/ProfileImageUpload";
function HomePage() {
  const navigate = useNavigate();
  const { logout, name, userId } = useContext(Context);
  //nedostaje u context userId
  let auth = document.cookie;
  console.log(auth, "auth");
  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, []);
  console.log(userId, "user id");
  axios.defaults.withCredentials = true;
  function handleLogout() {
    axios
      .post("http://localhost:4005/api/logout")
      .then(() => {
        logout();
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="profile-Container">
      <h2>Your Profile</h2>
      <ProfileImageUpload userId={userId} />
      {name}
      <button
        style={{ backgroundColor: "red", width: "100px" }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default HomePage;
