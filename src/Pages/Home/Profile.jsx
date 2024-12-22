import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";

function HomePage() {
  const navigate = useNavigate();
  const { logout, name } = useContext(Context);
  axios.defaults.withCredentials = true;
  function handleLogout() {
    axios
      .post("http://localhost:4005/api/logout")
      .then(() => {
        logout();
        navigate("/login");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="flex h-screen">
      <main className="flex-1 p-8 bg-gray-100">
        {name}
        <button style={{ backgroundColor: "red" }} onClick={handleLogout}>
          Logout
        </button>
      </main>
    </div>
  );
}

export default HomePage;
