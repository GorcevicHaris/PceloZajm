import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "./Context";
import "./Sidebar.css";

const Sidebar = () => {
  const { role } = useContext(Context);

  const menuItems = [
    role === "beekeeper" || role === "creator"
      ? {
          text: "ManageOrder",
          icon: "📋",
          link: "/manageOrder",
        }
      : null,
    role === "beekeeper" || role === "creator"
      ? { text: "Dashboard", icon: "📊", link: "/dashboard" }
      : null,
    { text: "User Profile", icon: "👤", link: "/profile" },
    role === "beekeeper" || role === "creator"
      ? { text: "insertHives", icon: "Ⰶ", link: "/hivebeekeeper" }
      : null,
    role === "beekeeper" || role === "creator"
      ? { text: "Hives", icon: "🏠", link: "/hivesEditDelete" }
      : null,
    role === "creator"
      ? { text: "InsertUser", icon: "➕", link: "/userForm" }
      : null,
    role === "beekeeper" || role === "creator"
      ? { text: "Users", icon: "👥", link: "/users" }
      : null,
    role !== "beekeeper" && role !== "creator"
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
        <h2 style={{ color: "black" }}>Beekeeper</h2>
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
