import axios from "axios";
import React, { use, useEffect, useState } from "react";
import "./hive.css";
import { data } from "react-router-dom";
//includes za nizove samo a some sa niz objekata
function Hives() {
  const [hiveItems, setHiveItems] = useState([]);
  const [editPopUp, setEditPopUp] = useState(false);
  const [selectedHive, setSelectedHive] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHives = hiveItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    function getData() {
      axios.get("http://localhost:4005/api/Hives").then((res) => {
        console.log(res.data, "pokusaj");
        setHiveItems(res.data);
      });
    }
    getData();
  }, []);
  axios.defaults.withCredentials = true;
  console.log(selectedHive);

  function editBtn(data) {
    setSelectedHive(data);
    setEditPopUp(true);
  }
  function editButton() {
    if (!selectedHive) return;

    axios
      .put("http://localhost:4005/api/edit", selectedHive)
      .then((res) => {
        console.log(res.data, "lets see");
        setHiveItems((prev) =>
          prev.map((data) => (data.id == selectedHive.id ? selectedHive : data))
        );
        setEditPopUp(false);
      })
      .catch((err) => {
        console.log("Error updating hive:", err);
      });
  }

  function deleteHive(hiveID) {
    axios
      .delete("http://localhost:4005/api/deleteHive", { data: { id: hiveID } })
      .then((res) => {
        setHiveItems((prev) => prev.filter((data) => data.id !== hiveID));
      })
      .catch((err) => console.log(err, "greska"));
  }
  return (
    <div className="hives-container">
      {editPopUp && selectedHive && (
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
          <select
            onChange={(e) =>
              setSelectedHive({ ...selectedHive, status: e.target.value })
            }
            value={selectedHive.status}
            style={{ width: "100%" }}
          >
            {[...new Set(hiveItems.map((data) => data.status))].map(
              (status) => (
                <option value={status}>{status}</option>
              )
            )}
          </select>
          <div className="btnEdCl">
            <button className="btn-primary" onClick={() => setEditPopUp(false)}>
              Close
            </button>
            <button className="btn-primary" onClick={editButton}>
              Update
            </button>
          </div>
        </div>
      )}

      <h2 className="hives-title">Lista Košnica</h2>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      ></input>
      <div className="hives-list">
        {filteredHives.length > 0 &&
          filteredHives.map((data) => {
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
                    style={{ backgroundColor: "#0056b3" }}
                    onClick={() => editBtn(data)}
                    className="hive-edit-button"
                  >
                    Edit
                  </button>
                  <button
                    style={{ backgroundColor: "#0056b3" }}
                    onClick={() => deleteHive(data.id)}
                    className="hive-delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Hives;
