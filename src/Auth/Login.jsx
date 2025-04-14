import React, { useContext, useEffect, useState } from "react";
import "./reglog.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../Context";
import Cookies from "js-cookie"; // Import js-cookie
import { jwtDecode } from "jwt-decode";

function Login() {
  const { login } = useContext(Context);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Ensure cookies are sent with requests
  axios.defaults.withCredentials = true;

  // Check if user is already authenticated on mount
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        jwtDecode(token); // Validate token format
        // Verify token with backend
        axios
          .get("http://localhost:4005/api/homeGetData", {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data.Status === "Sucess") {
              login(token); // Update context
              navigate("/profile");
            } else {
              Cookies.remove("token"); // Clear invalid token
            }
          })
          .catch(() => {
            Cookies.remove("token"); // Clear invalid token
          });
      } catch (error) {
        console.error("Invalid token:", error);
        Cookies.remove("token"); // Clear invalid token
      }
    }
  }, [navigate, login]);

  function PostData(e) {
    e.preventDefault();
    setError("");
    axios
      .post("http://localhost:4005/api/login", values, {
        withCredentials: true, // Allow backend to set cookie
      })
      .then((res) => {
        if (res.data.Success) {
          const token = Cookies.get("token"); // Read cookie set by backend
          if (token) {
            try {
              login(token); // Update context with token
              navigate("/profile");
            } catch (error) {
              setError("Invalid token received");
              Cookies.remove("token");
            }
          } else {
            setError("Login failed: Token not received");
          }
        } else {
          setError(res.data.Message || "Invalid credentials");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        setError("An error occurred during login");
      });
  }

  return (
    <div className="container">
      <div className="login-box">
        <h2>Dobrodošli nazad</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={PostData}>
          <div className="form-group">
            <input
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              name="email"
              placeholder="Unesite vašu email adresu"
              required
            />
          </div>
          <div className="form-group">
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
          <div className="signup-link" onClick={() => navigate("/register")}>
            Nemate nalog? Registrujte se
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
