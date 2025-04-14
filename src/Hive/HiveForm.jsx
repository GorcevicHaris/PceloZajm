import React, { useContext, useEffect, useState } from "react";
import "./hives.css";
import axios from "axios";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "../Context";
import { useNavigate } from "react-router-dom";

function HiveForm() {
  const navigate = useNavigate();
  const [hiveItems, setHiveItems] = useState([]);
  const { role, userId } = useContext(Context);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [singleFormData, setSingleFormData] = useState({
    name: "",
    description: "",
    location: "",
    status: "",
    userId: userId,
  });
  const [bulkFormData, setBulkFormData] = useState({
    count: 1,
    namePrefix: "kosnica",
    location: "",
    status: "",
    userId: userId,
  });

  useEffect(() => {
    function getData() {
      axios
        .get("http://localhost:4005/api/Hives", {
          params: { userId },
        })
        .then((res) => {
          console.log(res.data, "da li iradi");
          setHiveItems(res.data);
        })
        .catch((err) => console.error("Error fetching hives:", err));
    }
    if (userId) {
      getData();
    }
  }, [userId]);

  console.log(role, "ovo je］role");

  // Redirect if not admin or creator
  useEffect(() => {
    if (role !== "admin" && role !== "creator") {
      console.log("Redirecting to /profile, role =", role);
      navigate("/profile");
    }
  }, [role, navigate]);

  // Render nothing if not admin or creator
  if (role !== "admin" && role !== "creator") {
    console.log("Rendering null, role =", role);
    return null;
  }

  // Handle single hive form changes
  const handleSingleChange = (e) => {
    setSingleFormData({ ...singleFormData, [e.target.name]: e.target.value });
  };

  // Handle bulk form changes
  const handleBulkChange = (e) => {
    setBulkFormData({ ...bulkFormData, [e.target.name]: e.target.value });
  };

  // Handle single hive submission
  const handleSingleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4005/api/addHive", singleFormData)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Košnica uspešno dodata!",
          background: "#D4EDDA",
          width: "400px",
          confirmButtonColor: "#28a745",
        });
        setSingleFormData({
          name: "",
          description: "",
          location: "",
          status: "",
          userId: userId,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Već postoji košnica sa tim imenom",
          background: "#F8D7DA",
          width: "400px",
          confirmButtonColor: "#dc3545",
        });
      });
  };

  // Handle bulk hive submission
  const handleBulkSubmit = async (e) => {
    e.preventDefault();
    const { count, namePrefix, location, status } = bulkFormData;
    if (!count || count < 1 || !location || !status) {
      Swal.fire({
        icon: "error",
        title: "Popunite sva polja!",
        background: "#F8D7DA",
        width: "400px",
        confirmButtonColor: "#dc3545",
      });
      return;
    }

    try {
      const promises = [];
      for (let i = 1; i <= count; i++) {
        const hiveData = {
          name: `${namePrefix}${i}`,
          description: `Košnica ${i} kreirana automatski`,
          location,
          status,
          userId,
        };
        promises.push(
          axios.post("http://localhost:4005/api/addHive", hiveData)
        );
      }

      const results = await Promise.allSettled(promises);
      const errors = results.filter((r) => r.status === "rejected");
      const successes = results.filter((r) => r.status === "fulfilled");

      if (errors.length === 0) {
        Swal.fire({
          icon: "success",
          title: `${successes.length} košnica uspešno dodato!`,
          background: "#D4EDDA",
          width: "400px",
          confirmButtonColor: "#28a745",
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: `Dodato ${successes.length} košnica, ${errors.length} grešaka`,
          text: "Neke košnice možda već postoje.",
          background: "#FFF3CD",
          width: "400px",
          confirmButtonColor: "#ffc107",
        });
      }

      setBulkFormData({
        count: 1,
        namePrefix: "kosnica",
        location: "",
        status: "", // Fixed
        userId: userId,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Greška prilikom dodavanja košnica",
        text: err.response?.data?.message || "Nepoznata greška",
        background: "#F8D7DA",
        width: "400px",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Dodaj košnice</h2>
      <button
        className="toggle-button"
        onClick={() => setIsBulkMode(!isBulkMode)}
        style={{ marginBottom: "20px" }}
      >
        {isBulkMode
          ? "Pređi na pojedinačno dodavanje"
          : "Pređi na masovno dodavanje"}
      </button>

      {isBulkMode ? (
        <form onSubmit={handleBulkSubmit} className="form">
          <div className="form-group">
            <label htmlFor="count">Broj košnica</label>
            <input
              type="number"
              name="count"
              id="count"
              value={bulkFormData.count}
              onChange={handleBulkChange}
              min="1"
              max="500" // Added limit
              placeholder="Unesite broj košnica"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="namePrefix">Prefiks imena</label>
            <input
              type="text"
              name="namePrefix"
              id="namePrefix"
              value={bulkFormData.namePrefix}
              onChange={handleBulkChange}
              placeholder="npr. kosnica"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="location"
              id="location"
              value={bulkFormData.location}
              onChange={handleBulkChange}
              placeholder="Unesite lokaciju košnica"
              required
            />
          </div>

          <div className="form-group">
            <select
              name="status"
              id="status"
              value={bulkFormData.status}
              onChange={handleBulkChange}
              required
            >
              <option value="">Izaberite status</option>
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <button type="submit" className="submit-button">
            Dodaj košnice
          </button>
        </form>
      ) : (
        <form onSubmit={handleSingleSubmit} className="form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              id="name"
              value={singleFormData.name}
              onChange={handleSingleChange}
              placeholder="Unesite ime košnice"
              required
            />
          </div>

          <div className="form-group">
            <textarea
              name="description"
              id="description"
              value={singleFormData.description}
              onChange={handleSingleChange}
              placeholder="Unesite opis košnice"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="location"
              id="location"
              value={singleFormData.location}
              onChange={handleSingleChange}
              placeholder="Unesite lokaciju košnice"
              required
            />
          </div>

          <div className="form-group">
            <select
              name="status"
              id="status"
              value={singleFormData.status}
              onChange={handleSingleChange}
              required
            >
              <option value="">Izaberite status</option>
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <button type="submit" className="submit-button">
            Spremi košnicu
          </button>
        </form>
      )}
    </div>
  );
}

export default HiveForm;
