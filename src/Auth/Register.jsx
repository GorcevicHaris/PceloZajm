import React, { useEffect, useState } from "react";
import "./reglog.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {
  axios.defaults.withCredentials = true;

  function postData() {
    axios
      .post("http://localhost:4005/api/register", values)
      .then((res) => {
        navigate("/login");
        console.log(res);
      })
      .catch((err) => console.log(err, "error"));
  }
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  let auth = document.cookie;
  console.log(auth, "auth");
  useEffect(() => {
    if (auth) {
      navigate("/home");
    }
  }, []);
  console.log(values);
  const navigate = useNavigate();
  return (
    <div className="container">
      <h2>Register</h2>
      <form>
        <div className="form-group">
          <label>Username</label>
          <input
            name="name"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            type="name"
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            onChange={(e) => {
              return setValues({ ...values, email: e.target.value });
            }}
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <button onClick={postData} type="button">
          Register
        </button>
        <label
          onClick={() => navigate("/login")}
          style={{ fontSize: "12px", cursor: "pointer", marginTop: "5px" }}
        >
          Already have an account ? go to login
        </label>
      </form>
    </div>
  );
}

export default Register;
