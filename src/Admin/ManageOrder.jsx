import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./manageorder.css";
import { Context } from "../Context";

const AdminOrders = () => {
  const [availableHives, setAvailableHives] = useState([]);
  const [filteredPendingOrders, setFilteredPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useContext(Context);

  useEffect(() => {
    function getOrders() {
      setLoading(true);
      axios
        .get("http://localhost:4005/api/getOrders", {
          params: { admin_id: userId },
        })
        .then((res) => {
          setFilteredPendingOrders(
            res.data.filter((el) => el.status === "pending")
          );
        })
        .catch((err) => console.log(err, "gresk"))
        .finally(() => setLoading(false));
    }
    getOrders();
  }, [userId]);

  useEffect(() => {
    function getAvailableHives() {
      axios
        .get("http://localhost:4005/api/totalAvailableHives")
        .then((res) => {
          setAvailableHives(res.data);
        })
        .catch((err) => console.error("Error fetching hives:", err));
    }
    getAvailableHives();
  }, []);

  function approveOrder(orderId, quantityHive) {
    axios
      .put("http://localhost:4005/api/approveOrder", {
        orderId: orderId,
        quantityHive: quantityHive,
        admin_id: userId,
      })
      .then((res) => {
        alert("Narudžbina uspešno prihvaćena!");
        setFilteredPendingOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderId)
        );
      })
      .catch((err) => {
        console.error("Error approving order:", err);
        const availableHives = err.response?.data?.availableHives || 0;
        alert(
          `Narudžbina ne može biti prihvaćena. Dostupno je samo ${availableHives} košnica za ovog admina.`
        );
      });
  }

  function declineDelete(id, user_id) {
    axios
      .delete("http://localhost:4005/api/declineDelete", {
        data: { id: id, user_id: user_id },
      })
      .then((res) => {
        setFilteredPendingOrders((prev) =>
          prev.filter((data) => data.id !== id)
        );
        alert("Narudžbina uspešno odbijena!");
      })
      .catch((err) => console.error("Error declining order:", err));
  }

  return (
    <div className="admin-orders-container">
      <h1>Pending Orders</h1>
      {loading ? (
        <div className="loading">Učitavanje narudžbina...</div>
      ) : filteredPendingOrders.length === 0 ? (
        <div className="no-orders">Nema narudžbina na čekanju.</div>
      ) : (
        <div className="orders-grid">
          {filteredPendingOrders.map((order) => (
            <div key={order.id} className="order-card">
              <h3>Narudžbina #{order.id}</h3>
              <div className="order-details">
                <p>
                  <span>Ime:</span> {order.userName}
                </p>
                <p>
                  <span>Status:</span> {order.status}
                </p>
                <p>
                  <span>Početak:</span> {order.start_date}
                </p>
                <p>
                  <span>Kraj:</span> {order.end_date}
                </p>
                <p>
                  <span>Količina:</span> {order.quantityHive}
                </p>
                <p>
                  <span>Održavanje:</span> {order.Maintaining_hives}
                </p>
                <p>
                  <span>Ekstrakcija:</span> {order.Honey_extraction}
                </p>
                <p>
                  <span>Telefon:</span> {order.phoneNumber}
                </p>
                <p>
                  <span>Lokacija:</span> {order.location}
                </p>
              </div>
              <div className="order-actions">
                <button
                  onClick={() => approveOrder(order.id, order.quantityHive)}
                  aria-label={`Prihvati narudžbinu ${order.id}`}
                >
                  Prihvati
                </button>
                <button
                  onClick={() => declineDelete(order.id, order.user_id)}
                  className="decline"
                  aria-label={`Odbij narudžbinu ${order.id}`}
                >
                  Odbij
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
