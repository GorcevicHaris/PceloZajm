import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./orderhives.css";
import { Context } from "../Context";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    quantityHive: "",
    start_date: "",
    end_date: "",
    honeyExtraction: "",
    maintainingHives: "",
    admin_id: "",
  });
  const [dateError, setDateError] = useState(""); // Track date validation errors
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [availableHives, setAvailableHives] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { userId, role } = useContext(Context);
  const [nameOfadmin, setNameOfAdmin] = useState([]);
  const HIVE_RENTAL_PRICE = 30;
  const EXTRACTION_COST = 2;
  const MAINTAINING_COST = 4;

  // Redirect if not authenticated
  useEffect(() => {
    if (!userId || !role) {
      navigate("/");
    }
  }, [userId, role, navigate]);

  // Calculate total price
  useEffect(() => {
    const quantity = parseInt(formData.quantityHive || 0, 10);
    const extraction = formData.honeyExtraction === "yes" ? EXTRACTION_COST : 0;
    const maintaining =
      formData.maintainingHives === "yes" ? MAINTAINING_COST : 0;
    const calculatedPrice =
      quantity * (HIVE_RENTAL_PRICE + extraction + maintaining);
    setTotalPrice(calculatedPrice);
  }, [formData]);

  // Validate dates whenever they change
  useEffect(() => {
    setDateError("");
    const today = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD
    const { start_date, end_date } = formData;

    if (start_date && start_date < today) {
      setDateError("Datum početka ne može biti u prošlosti.");
      return;
    }

    if (start_date && end_date && end_date <= start_date) {
      setDateError("Datum završetka mora biti posle datuma početka.");
    }
  }, [formData.start_date, formData.end_date]);

  // Fetch admin names
  useEffect(() => {
    axios
      .get("http://localhost:4005/api/getAdminNames")
      .then((res) => {
        setNameOfAdmin(res.data);
        console.log(res.data, "provera imena od admina da li je tu creator");
      })
      .catch((err) => console.error("Error fetching admins:", err));
  }, []);

  // Fetch available hives
  useEffect(() => {
    axios
      .get("http://localhost:4005/api/totalAvailableHives")
      .then((res) => {
        setAvailableHives(res.data);
        console.log(res.data, "ovo su slobodne kosnice");
      })
      .catch((err) => console.error("Error fetching hives:", err));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check date errors
    if (dateError) {
      Swal.fire({
        icon: "error",
        title: "Nevalidni datumi",
        text: dateError,
        confirmButtonColor: "#c62828",
        background: "#fdf6e3",
      });
      setLoading(false);
      return;
    }

    // Check available hives
    const adminAvailableHives = availableHives.filter(
      (hive) => hive.hiveIDUser === parseInt(formData.admin_id)
    );
    if (parseInt(formData.quantityHive) > adminAvailableHives.length) {
      Swal.fire({
        icon: "error",
        title: "Nedovoljno košnica",
        text: `Dostupno je samo ${adminAvailableHives.length} košnica za ovog pčelara.`,
        confirmButtonColor: "#c62828",
        background: "#fdf6e3",
      });
      setLoading(false);
      return;
    }

    const data = { ...formData, user_id: userId, total_price: totalPrice };

    try {
      await axios.post("http://localhost:4005/api/orderHives", data);
      Swal.fire({
        icon: "success",
        title: "Narudžbina uspešna!",
        text: "Vaša narudžbina je uspešno poslata.",
        confirmButtonColor: "#2e7d32",
        background: "#fdf6e3",
      });
      setFormData({
        quantityHive: "",
        start_date: "",
        end_date: "",
        honeyExtraction: "",
        maintainingHives: "",
        admin_id: "",
      });
      setTotalPrice(0);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Greška",
        text:
          err.response?.data?.message ||
          "Došlo je do problema prilikom naručivanja.",
        confirmButtonColor: "#c62828",
        background: "#fdf6e3",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-hives-container">
      <div className="order-hives-card">
        <h1 className="order-hives-title">Naruči košnice</h1>
        <div className="order-hives-info">
          <p>
            Cena po košnici: <span>$30</span>
          </p>
          <p>
            Ekstrakcija meda po košnici: <span>$2</span>
          </p>
          <p>
            Održavanje košnica po košnici: <span>$4</span>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="order-hives-form">
          <div className="form-group">
            <label htmlFor="admin_id">Izaberi pčelara</label>
            <select
              id="admin_id"
              name="admin_id"
              value={formData.admin_id}
              onChange={handleChange}
              required
              aria-describedby="admin-error"
            >
              <option value="">Izaberi pčelara</option>
              {nameOfadmin.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.name}
                </option>
              ))}
            </select>
            {formData.admin_id && (
              <p className="availability-text">
                Dostupno košnica:{" "}
                <span>
                  {
                    availableHives.filter(
                      (hive) => hive.hiveIDUser === parseInt(formData.admin_id)
                    ).length
                  }
                </span>
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="quantityHive">Broj košnica</label>
            <input
              type="number"
              id="quantityHive"
              name="quantityHive"
              value={formData.quantityHive}
              onChange={handleChange}
              min="1"
              max={
                formData.admin_id
                  ? availableHives.filter(
                      (hive) => hive.hiveIDUser === parseInt(formData.admin_id)
                    ).length
                  : undefined
              }
              placeholder="Unesi kolicinu"
              required
              aria-describedby="quantity-error"
            />
          </div>
          <div className="form-group">
            <label htmlFor="start_date">Datum početka</label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]} // Prevent past dates
              required
              aria-describedby="date-error"
            />
          </div>
          <div className="form-group">
            <label htmlFor="end_date">Datum završetka</label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              min={
                formData.start_date
                  ? new Date(
                      new Date(formData.start_date).getTime() +
                        24 * 60 * 60 * 1000
                    )
                      .toISOString()
                      .split("T")[0]
                  : undefined
              } // At least one day after start_date
              aria-describedby="date-error"
            />
            {dateError && (
              <p className="error-text" id="date-error">
                {dateError}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="honeyExtraction">Ekstrakcija meda</label>
            <select
              id="honeyExtraction"
              name="honeyExtraction"
              value={formData.honeyExtraction}
              onChange={handleChange}
              aria-describedby="honey-error"
            >
              <option value="">Izaberi</option>
              <option value="yes">Da</option>
              <option value="no">Ne</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="maintainingHives">Održavanje košnica</label>
            <select
              id="maintainingHives"
              name="maintainingHives"
              value={formData.maintainingHives}
              onChange={handleChange}
              aria-describedby="maintenance-error"
            >
              <option value="">Izaberi</option>
              <option value="yes">Da</option>
              <option value="no">Ne</option>
            </select>
          </div>
          <div className="total-price">
            <p>
              Ukupna cena: <span>${totalPrice}</span>
            </p>
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={loading || !!dateError}
            aria-disabled={loading || !!dateError}
          >
            {loading ? (
              <span className="loading-spinner">Slanje...</span>
            ) : (
              "Pošalji narudžbinu"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
