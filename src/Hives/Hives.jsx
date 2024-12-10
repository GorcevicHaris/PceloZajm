import axios from "axios";
import React, { use, useEffect, useState } from "react";
import "./hive.css";
import { data } from "react-router-dom";

function Hives() {
  const [hiveItems, setHiveItems] = useState([]);
  const [editPopUp, setEditPopUp] = useState(false);
  const [selectedHive, setSelectedHive] = useState(null);
  useEffect(() => {
    function getData() {
      axios.get("http://localhost:4005/api/Hives").then((res) => {
        console.log(res.data, "pokusaj");
        setHiveItems(res.data);
      });
    }
    getData();
  }, []);
  console.log(selectedHive);
  function editBtn(data) {
    setSelectedHive(data);
    setEditPopUp(true);
  }

  return (
    <div className="hives-container">
      {editPopUp && (
        <div className="popup">
          <label style={{ textAlign: "left" }}>Name</label>
          <input value={selectedHive.name}></input>
          <label>Description</label>
          <input value={selectedHive.description}></input>
          <label>Location</label>
          <input value={selectedHive.location}></input>
          <label>Status</label>
          <select value={selectedHive.status} style={{ width: "100%" }}>
            {[...new Set(hiveItems.map((data) => data.status))].map(
              (status) => (
                <option value={status}>{status}</option>
              )
            )}
          </select>
          <button onClick={() => setEditPopUp(false)}>Close</button>
        </div>
      )}

      <h2 className="hives-title">Lista Košnica</h2>
      <div className="hives-list">
        {hiveItems &&
          hiveItems.map((data) => {
            return (
              <div className="hive-card" key={data.id}>
                <div className="hive-info">
                  <label className="hive-name">{data.name}</label>
                  <label className="hive-description">{data.description}</label>
                  <label className="hive-location">{data.location}</label>
                  <label className="hive-status">{data.status}</label>
                </div>
                <div className="hive-actions">
                  <button
                    onClick={() => editBtn(data)}
                    className="hive-edit-button"
                  >
                    Edit
                  </button>
                  <button className="hive-delete-button">Delete</button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Hives;
