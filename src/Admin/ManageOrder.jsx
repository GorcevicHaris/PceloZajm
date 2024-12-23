import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./manageorder.css"; // Import the CSS
import { Context } from "../Context";

const AdminOrders = () => {
  const [availableHives, setAvailableHives] = useState([]);
  const [filteredPendingOrders, setFilteredPendingOrders] = useState([]);
  const { userId } = useContext(Context);
  useEffect(() => {
    function getOrders() {
      axios
        .get("http://localhost:4005/api/getOrders", {
          params: { admin_id: userId },
        })
        .then((res) => {
          console.log(res.data, "pending", "asljdhasjkdhasd");
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
        admin_id: userId,
      })
      .then((res) => {
        alert("Order approved successfully!");
        setFilteredPendingOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderId)
        );
      })
      .catch((err) => {
        console.error("Error approving order:", err);
        const availableHives = err.response?.data?.availableHives || 0;
        alert(
          `Order cannot be approved. There are only ${availableHives} hives available for this admin.`
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
