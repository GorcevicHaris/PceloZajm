import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./orderhives.css";
import { Context } from "../Context";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    quantityHive: "",
    start_date: "",
    end_date: "",
    honeyExtraction: "no", // New state for Honey Extraction
    maintainingHives: "no", // New state for Maintaining Hives
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [availableHives, setAvailableHives] = useState([]);
  const { userId, setUserID } = useContext(Context);

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
      axios.get("http://localhost:4005/api/totalAvailableHives").then((res) => {
        setAvailableHives(res.data);
        console.log(res.data, "available kosnice");
      });
    }
    getAvailableHives();
  }, []);

  function orderHive() {
    const data = { ...formData, user_id: userId };
    if (formData.quantityHive <= availableHives.length) {
      axios
        .post("http://localhost:4005/api/orderHives", data)
        .then((res) => {
          console.log(res);
          setSuccessMessage("Order placed successfully!");
        })
        .catch((err) => {
          console.log(err, "error");
          setErrorMessage("There was an issue with your order.");
        });
    } else {
      alert("You cannot order more hives than available.");
    }
  }

  console.log(userId, "lalalallalalal");
  console.log(formData);

  return (
    <div className="order-hives">
      <h1>Create a New Order</h1>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="order-form">
        <div>
          <label>Quantity of Hives:</label>
          <input
            type="number"
            name="quantityHive"
            value={formData.quantityHive}
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

        {/* Honey Extraction Dropdown */}
        <div className="select-container">
          <label>Honey Extraction:</label>
          <select
            name="honeyExtraction"
            value={formData.honeyExtraction}
            onChange={handleChange}
            className="select-input"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Maintaining Hives Dropdown */}
        <div className="select-container">
          <label>Maintaining Hives:</label>
          <select
            name="maintainingHives"
            value={formData.maintainingHives}
            onChange={handleChange}
            className="select-input"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <button onClick={orderHive} type="submit">
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
