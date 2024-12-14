import React, { useState, useEffect } from "react";
import axios from "axios";
import "./manageorder.css"; // Import the CSS

const AdminOrders = () => {
  const [availableHives, setAvailableHives] = useState([]);
  const [filteredPendingOrders, setFilteredPendingOrders] = useState([]);
  useEffect(() => {
    function getOrders() {
      axios
        .get("http://localhost:4005/api/getOrders")
        .then((res) => {
          console.log(res.data, "pending");
          setFilteredPendingOrders(
            res.data.filter((el) => el.status == "pending")
          );
        })
        .catch((err) => console.log(err, "gresk"));
    }
    getOrders();
  }, []);
  console.log(filteredPendingOrders, "filtrirani pending orders");

  function approveOrder(orderId, quantityHive) {
    axios
      .put("http://localhost:4005/api/approveOrder", {
        orderId: orderId,
        quantityHive: quantityHive,
      })
      .then((res) => {
        alert("Order approved successfully!");
        setFilteredPendingOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderId)
        );
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

  function declineDelete(id, user_id) {
    axios
      .delete("http://localhost:4005/api/declineDelete", {
        data: { id: id, user_id: user_id },
      })
      .then((res) => {
        console.log(res, "rrrrr");
        setFilteredPendingOrders((prev) =>
          prev.filter((data) => data.id !== id)
        );
      });
  }
  return (
    <div>
      <h1>Pending Orders</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Quantity</th>
              <th>Maintaining Hives</th>
              <th>Honey Extraction</th>
              <th>Actions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPendingOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.userName}</td>
                <td>{order.status}</td>
                <td>{order.start_date}</td>
                <td>{order.end_date}</td>
                <td>{order.quantityHive}</td>
                <td>{order.Maintaining_hives}</td>
                <td>{order.Honey_extraction}</td>
                <td>
                  <button
                    onClick={() => approveOrder(order.id, order.quantityHive)}
                  >
                    Accept
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => declineDelete(order.id, order.user_id)}
                  >
                    Decline
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
