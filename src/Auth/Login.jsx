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

  return (
    <div className="container">
      <div className="login-box">
        <h2>Dobrodošli nazad</h2>
        <form onSubmit={PostData}>
          <div className="form-group">
            <label>Email adresa</label>
            <input
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              name="email"
              placeholder="Unesite vašu email adresu"
              required
            />
          </div>
          <div className="form-group">
            <label>Lozinka</label>
            <input
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              type="password"
              name="password"
              placeholder="Unesite vašu lozinku"
              required
            />
          </div>
          <button type="submit">Prijavi se</button>
          <div className="signup-link" onClick={() => navigate("/")}>
            Nemate nalog? Registrujte se
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
