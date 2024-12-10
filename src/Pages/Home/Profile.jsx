import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";

function HomePage() {
  const { userId, setUserId, islogged, setIsLogged } = useContext(Context);

  const [userName, setUserName] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    function getData() {
      axios
        .get("http://localhost:4005/api/homeGetData")
        .then((response) => {
          if (response.data.Status === "Sucess") {
            setUserId(response.data.data[0].id);
            setUserName(response.data.data[0].name);
            console.log(response.data.data[0], "odgovor");
          } else {
            console.log("failed");
          }
        })
        .catch((err) => console.log(err, "greska"));
    }
    getData();
  }, [setUserId]);

  function handleLogout() {
    axios
      .post("http://localhost:4005/api/logout")
      .then(() => {
        setUserId(null);
        setIsLogged(false);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="flex h-screen">
      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your dashboard</p>
        <button style={{ backgroundColor: "red" }} onClick={handleLogout}>
          Logout
        </button>
      </main>
    </div>
  );
}

export default HomePage;
