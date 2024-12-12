import React, { useContext, useEffect, useState } from "react";
import "./userForm.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Context } from "../Context";
import { useNavigate } from "react-router-dom";

function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
  });
  const { role, setRole } = useContext(Context);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (role !== "admin") {
      navigate("/profile");
    }
  }, []);
  if (role !== "admin") {
    return null;
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4005/api/addUser", formData)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Korisnik uspešno dodat!",
          background: "#D4EDDA",
          width: "400px",
          confirmButtonColor: "black",
        });
        // Resetovanje forme
        setFormData({
          name: "",
          email: "",
          password: "",
          phone_number: "",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Greška pri dodavanju korisnika",
          background: "#F8D7DA",
          width: "400px",
          confirmButtonColor: "#dc3545",
        });
      });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Dodaj novog korisnika</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Ime korisnika</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Unesite ime korisnika"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Unesite email korisnika"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Lozinka</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Unesite lozinku"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone_number">Broj telefona</label>
          <input
            type="text"
            name="phone_number"
            id="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Unesite broj telefona"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Spremi korisnika
        </button>
      </form>
    </div>
  );
}

export default UserForm;
