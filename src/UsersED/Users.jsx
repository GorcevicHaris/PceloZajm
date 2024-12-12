import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./usersed.css"; // CSS fajl za korisnički obrazac
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../Context";

function Users() {
  const [userItems, setUserItems] = useState([]);
  const [editPopUp, setEditPopUp] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { role, setRole } = useContext(Context);
  const filteredUsers = userItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const navigate = useNavigate();
  useEffect(() => {
    function getData() {
      axios.get("http://localhost:4005/api/Users").then((res) => {
        console.log(res.data, "pokusaj");
        setUserItems(res.data);
      });
    }
    getData();
  }, []);
  console.log(role, "roleusers");
  useEffect(() => {
    if (role !== "admin") {
      navigate("/profile");
    }
  }, []);

  if (role !== "admin") {
    return null;
  }

  axios.defaults.withCredentials = true;

  function editBtn(data) {
    setSelectedUser(data);
    setEditPopUp(true);
  }

  function editButton() {
    if (!selectedUser) return;

    axios
      .put("http://localhost:4005/api/editUser", selectedUser)
      .then((res) => {
        console.log(res.data, "lets see");
        setUserItems((prev) =>
          prev.map((data) =>
            data.id === selectedUser.id ? selectedUser : data
          )
        );
        setEditPopUp(false);
      })
      .catch((err) => {
        console.log("Error updating user:", err);
      });
  }

  function deleteUser(userID) {
    axios
      .delete("http://localhost:4005/api/deleteUser", { data: { id: userID } })
      .then((res) => {
        setUserItems((prev) => prev.filter((data) => data.id !== userID));
      })
      .catch((err) => console.log(err, "greska"));
  }

  return (
    <div className="users-container">
      {editPopUp && selectedUser && (
        <div className="popup">
          <label style={{ textAlign: "left" }}>Name</label>
          <input
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, name: e.target.value })
            }
            value={selectedUser.name}
          ></input>
          <label>Email</label>
          <input
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, email: e.target.value })
            }
            value={selectedUser.email}
          ></input>
          <label>Password</label>
          <input
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, password: e.target.value })
            }
            value={selectedUser.password}
          ></input>
          <label>Phone</label>
          <input
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, phone_number: e.target.value })
            }
            value={selectedUser.phone_number}
          ></input>
          <label>Role</label>
          <select
            value={selectedUser.role}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, role: e.target.value })
            }
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
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

      <h2 className="users-title">Lista Korisnika</h2>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search users"
      ></input>
      <div className="users-list">
        {filteredUsers.length > 0 &&
          filteredUsers.map((data) => {
            return (
              <div className="user-card" key={data.id}>
                <div className="user-info">
                  <label className="user-username">Ime - {data.name}</label>
                  <label className="user-password">Email - {data.email}</label>
                  <label className="user-phone_number">
                    Phone - {data.phone_number}
                  </label>
                  <label className="user-password">
                    Password - {data.password}
                  </label>
                  <label className="user-role">Role - {data.role}</label>
                </div>
                <div className="user-actions">
                  <button
                    style={{ backgroundColor: "black" }}
                    onClick={() => editBtn(data)}
                    className="user-edit-button"
                  >
                    Edit
                  </button>
                  <button
                    style={{ backgroundColor: "black" }}
                    onClick={() => deleteUser(data.id)}
                    className="user-delete-button"
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

export default Users;
