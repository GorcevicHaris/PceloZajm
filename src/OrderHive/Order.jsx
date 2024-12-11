import React, { useState, useEffect } from "react";
import axios from "axios";
import "./orderhives.css";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    hive_quantity: "",
    start_date: "",
    end_date: "",
    total_price: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [availableHives, setAvailableHives] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
  };

  useEffect(() => {
    function getAvailableHives() {
      axios
        .get("http://localhost:4005/api/totalAvailableHives")
        .then((res) => console.log(res.data, "available kosnice"));
    }
    getAvailableHives();
  }, []);
  console.log(formData);
  return (
    <div>
      <h1>Create a New Order</h1>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Quantity of Hives:</label>
          <input
            type="number"
            name="hive_quantity"
            value={formData.hive_quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
