import React, { useState, useEffect } from "react";
import axios from "axios";
import "./manageorder.css"; // Import the CSS

const AdminOrders = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [availableHives, setAvailableHives] = useState([]);
  useEffect(() => {
    function getOrders() {
      axios
        .get("http://localhost:4005/api/getOrders")
        .then((res) => {
          console.log(res.data, "pending");
          setPendingOrders(res.data);
        })
        .catch((err) => console.log(err, "gresk"));
    }
    getOrders();
  }, []);
  const filteredPendingOrders = pendingOrders.filter(
    (data) => data.status == "pending"
  );
  function approveOrder(orderId, quantityHive) {
    axios
      .put("http://localhost:4005/api/approveOrder", {
        orderId: orderId,
        quantityHive: quantityHive,
      })
      .then((res) => {
        alert("Order approved successfully!");
        setPendingOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderId)
        );
        // Ovo poređenje proverava da li je ID trenutne narudžbine (order.id)
        //  različit od ID-ja narudžbine koja je upravo odobrena (orderId).
      })
      .catch((err) => {
        console.log("Error approving order:", err);
        alert(
          `There are ${
            availableHives.length > 0 ? availableHives.length : 0
          } left`
        );
      });
  }

  useEffect(() => {
    function getAvailableHives() {
      axios.get("http://localhost:4005/api/totalAvailableHives").then((res) => {
        setAvailableHives(res.data);
        console.log(res.data, "available kosnice");
      });
    }
    getAvailableHives();
  }, []);

  return (
    <div>
      <h1>Pending Orders</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPendingOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.userName}</td>
                <td>{order.start_date}</td>
                <td>{order.end_date}</td>
                <td>{order.quantityHive}</td>
                <td>
                  <button
                    onClick={() => approveOrder(order.id, order.quantityHive)}
                  >
                    Accept
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
