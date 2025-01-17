import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./orderhives.css";
import { Context } from "../Context";
import { useNavigate } from "react-router-dom";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    quantityHive: "",
    start_date: "",
    end_date: "",
    honeyExtraction: "",
    maintainingHives: "",
    admin_id: "", // Dodano adminId
  });
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [availableHives, setAvailableHives] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { userId, role } = useContext(Context);
  const [nameOfadmin, setNameOfAdmin] = useState([]);
  const HIVE_RENTAL_PRICE = 30; // Price per hive rental
  const EXTRACTION_COST = 2; // Cost for honey extraction per hive
  const MAINTAINING_COST = 4; // Cost for maintaining hives per hive

  let auth = document.cookie;

  // if (!role) {
  //   navigate("/");
  // }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const quantity = parseInt(formData.quantityHive || 0, 10);
    const extraction = formData.honeyExtraction === "yes" ? EXTRACTION_COST : 0;
    const maintaining =
      formData.maintainingHives === "yes" ? MAINTAINING_COST : 0;

    const calculatedPrice =
      quantity * (HIVE_RENTAL_PRICE + extraction + maintaining);
    setTotalPrice(calculatedPrice);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
  };

  useEffect(() => {
    function getNameOfAdmins() {
      axios.get("http://localhost:4005/api/getAdminNames").then((res) => {
        console.log(res.data, "imena od admina");
        setNameOfAdmin(res.data);
      });
    }
    getNameOfAdmins();
  }, []);

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
    const data = { ...formData, user_id: userId, total_price: totalPrice };

    const adminAvailableHives = availableHives.filter(
      (hive) => hive.hiveIDUser === parseInt(formData.admin_id)
    );

    if (formData.quantityHive <= adminAvailableHives.length) {
      axios
        .post("http://localhost:4005/api/orderHives", data)
        .then((res) => {
          console.log(res);
          setSuccessMessage("Order placed successfully!");
          setErrorMessage("");
        })
        .catch((err) => {
          console.log(err, "error");
          setErrorMessage("There was an issue with your order.");
        });
    } else {
      alert(
        `You cannot order more hives than available. There are only ${adminAvailableHives.length} hives available for this admin.`
      );
    }
  }

  return (
    <div className="order-hives">
      <h1>Create a New Order</h1>
      <p>Price per hive is $30</p>
      <p>Honey extraction per hive is $2</p>
      <p>Maintaining hives per hive is $4</p>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="order-form">
        <div>
          <label>Choose Admin:</label>
          <select name="admin_id" onChange={handleChange}>
            <option value="">Select an admin</option>
            {nameOfadmin &&
              nameOfadmin.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.name}
                </option>
              ))}
          </select>
        </div>
        <p>
          Available hives for selected admin:{" "}
          {
            availableHives.filter(
              (hive) => hive.hiveIDUser === parseInt(formData.admin_id, 10)
            ).length
          }
        </p>

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

        <div className="select-container">
          <label>Honey Extraction:</label>
          <select
            name="honeyExtraction"
            value={formData.honeyExtraction}
            onChange={handleChange}
            className="select-input"
          >
            <option disabled selected></option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="select-container">
          <label>Maintaining Hives:</label>
          <select
            name="maintainingHives"
            value={formData.maintainingHives}
            onChange={handleChange}
            className="select-input"
          >
            <option disabled selected></option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <p>Total Price: ${totalPrice}</p>
        <button onClick={orderHive} type="submit">
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
