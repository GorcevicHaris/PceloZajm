import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";
import "./profile.css";
function HomePage() {
  const navigate = useNavigate();
  const { logout, name } = useContext(Context);
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
      {name}
      <button style={{ backgroundColor: "red" }} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default HomePage;
