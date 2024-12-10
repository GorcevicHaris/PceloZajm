import React, { useEffect, useState } from "react";
import "./hives.css";
import axios from "axios";

function HiveForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    status: "",
  });
  const [hiveItems, setHiveItems] = useState([]);

  useEffect(() => {
    function getData() {
      axios.get("http://localhost:4005/api/Hives").then((res) => {
        console.log(res.data, "da li iradi");
        setHiveItems(res.data);
      });
    }
    getData();
  }, []);
  //
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4005/api/addHive", formData).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Dodaj novu košnicu</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Ime košnice</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Unesite ime košnice"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Opis</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Unesite opis košnice"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Lokacija</label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Unesite lokaciju košnice"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="available">Available</option>
            <option value="rented">Rented</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Spremi Košnicu
        </button>
      </form>
    </div>
  );
}

export default HiveForm;
