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
  function changeInput(e) {
    setSelectedHive({ ...selectedHive, [e.target.name]: e.traget.value });
  }

  return (
    <div className="hives-container">
      {editPopUp && (
        <div className="popup">
          <label style={{ textAlign: "left" }}>Name</label>
          <input
            onChange={(e) =>
              setSelectedHive({ ...selectedHive, name: e.target.value })
            }
            value={selectedHive.name}
          ></input>
          <label>Description</label>
          <input
            onChange={(e) =>
              setSelectedHive({ ...selectedHive, description: e.target.value })
            }
            value={selectedHive.description}
          ></input>
          <label>Location</label>
          <input
            onChange={(e) =>
              setSelectedHive({ ...selectedHive, location: e.target.value })
            }
            value={selectedHive.location}
          ></input>
          <label>Status</label>
          <select value={selectedHive.status} style={{ width: "100%" }}>
            {[...new Set(hiveItems.map((data) => data.status))].map(
              (status) => (
                <option value={status}>{status}</option>
              )
            )}
          </select>
          <div className="btnEdCl">
            <button onClick={() => setEditPopUp(false)}>Close</button>
            <button onClick={() => setEditPopUp(false)}>Edit</button>
          </div>
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
