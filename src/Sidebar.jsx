import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "./Context";
import "./Sidebar.css";

const Sidebar = () => {
  const { role } = useContext(Context);

  const menuItems = [
    role === "admin" || role === "creator"
      ? {
          text: "ManageOrder",
          icon: "📋",
          link: "/manageOrder",
        }
      : null,
    role === "admin" || role === "creator"
      ? { text: "Dashboard", icon: "📊", link: "/dashboard" }
      : null,
    { text: "User Profile", icon: "👤", link: "/profile" },
    role === "admin" || role === "creator"
      ? { text: "insertHives", icon: "Ⰶ", link: "/hiveAdmin" }
      : null,
    role === "admin" || role === "creator"
      ? { text: "Hives", icon: "🏠", link: "/hivesEditDelete" }
      : null,
    role === "creator"
      ? { text: "InsertUser", icon: "➕", link: "/userForm" }
      : null,
    role === "admin" || role === "creator"
      ? { text: "Users", icon: "👥", link: "/users" }
      : null,
    role !== "admin" && role !== "creator"
      ? { text: "OrderHive", icon: "🛒", link: "/orderHive" }
      : null,
  ].filter(Boolean);

  if (!role) {
    return null;
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span className="logo-icon">🐝</span>
        <h2 style={{ color: "black" }}>Bee Admin</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <Link to={item.link} key={index} className="nav-item">
            <span className="nav-icon">{item.icon}</span>
            <span style={{ color: "black" }} className="nav-text">
              {item.text}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
