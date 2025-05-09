import React, { useEffect, useState } from "react";
import "./reglog.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterAsBeekeper() {
  axios.defaults.withCredentials = true;

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    role: "",
    expirience: "",
    description: "",
  });

  const navigate = useNavigate();

  function postData() {
    const role =
      values.description.trim() === "" || values.expirience.trim() === ""
        ? "user"
        : "beekeeper"; // Postavljamo role kao "beekeeper" za pčelara

    const dataToSend = { ...values, role }; // Dodajemo role u podatke

    axios
      .post("http://localhost:4005/api/register", dataToSend)
      .then((res) => {
        navigate("/login"); // Preusmeravanje nakon uspešne registracije
        console.log(res);
      })
      .catch((err) => console.log(err, "error"));
  }
  //

  let auth = document.cookie;

  useEffect(() => {
    if (auth) {
      navigate("/profile");
    }
  }, []);

  return (
    <div className="container">
      <h2>Beekeeper Registration</h2>
      <form>
        <div className="form-group">
          <label>Username</label>
          <input
            name="name"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            type="text"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            onChange={(e) =>
              setValues({ ...values, phone_number: e.target.value })
            }
            type="tel"
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="form-group">
          <label>Years of expirience</label>
          <input
            onChange={(e) =>
              setValues({ ...values, expirience: e.target.value })
            }
            type="number"
            min="0"
            placeholder="Years of beekeeping expirience"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
            placeholder="Tell us about your beekeeping expirience..."
            rows="4"
            required
          />
        </div>
        {/* <div className="form-group">
          <label>Role</label>
          <select
            onChange={(e) => setValues({ ...values, role: e.target.value })}
            required
          >
            <option value="">Select a role</option>
            <option value="beekeeper">Admin</option>
            <option value="user">User</option>
          </select>
        </div> */}
        <button onClick={postData} type="button" className="register-btn">
          Register
        </button>
        <button onClick={() => navigate("/register")}>
          Go Register as User
        </button>
        <p className="login-link" onClick={() => navigate("/login")}>
          Already have an account? Go to login
        </p>
      </form>
    </div>
  );
}

export default RegisterAsBeekeper;
