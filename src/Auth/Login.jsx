import React, { useContext, useEffect, useState } from "react";
import "./reglog.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../Context";
function Login() {
  const { login } = useContext(Context);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  axios.defaults.withCredentials = true;

  function PostData(e) {
    e.preventDefault();
    axios
      .post("http://localhost:4005/api/login", values)
      .then((res) => {
        login(res.data.Token);
        return navigate("/profile");
      })
      .catch((err) => console.log(err));
  }
  let auth = document.cookie;
  useEffect(() => {
    if (auth) {
      navigate("/profile");
    }
  }, []);
  console.log(values);
  return (
    <div className="container">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label>Email</label>
          <input
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            type="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            type="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>
        <button onClick={PostData} type="button">
          Login
        </button>
        <label
          onClick={() => navigate("/")}
          style={{ fontSize: "12px", cursor: "pointer", marginTop: "5px" }}
        >
          Sign up for register
        </label>
      </form>
    </div>
  );
}

export default Login;
