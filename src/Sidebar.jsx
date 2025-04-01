import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "./Context";
import "./Sidebar.css";

const Sidebar = () => {
  const { role } = useContext(Context);

  const menuItems = [
    role === "admin"
      ? {
          text: "ManageOrder",
          icon: "📋",
          link: "/manageOrder",
        }
      : null,
    role === "admin"
      ? { text: "Dashboard", icon: "📊", link: "/dashboard" }
      : null,
    { text: "User Profile", icon: "👤", link: "/profile" },
    role === "admin" ? { text: "Admin", icon: "⚙️", link: "/hiveAdmin" } : null,
    role === "admin"
      ? { text: "Hives", icon: "🏠", link: "/hivesEditDelete" }
      : null,
    role === "admin"
      ? { text: "InsertUser", icon: "➕", link: "/userForm" }
      : null,
    role === "admin" ? { text: "Users", icon: "👥", link: "/users" } : null,
    role !== "admin"
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
