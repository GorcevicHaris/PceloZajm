import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { Context } from "../Context";

function Header() {
  const navigate = useNavigate();
  const { userId } = useContext(Context);
  console.log(userId, "userid");
  if (!userId) {
    return (
      <header className="header">
        <div className="header-logo">
          <h1 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            🐝 Pčelarstvo
          </h1>
        </div>
        <nav className="header-nav">
          <ul>
            <li>
              <Link to="/">Početna</Link>
            </li>
            <li>
              <Link to="/about">O nama</Link>
            </li>
            <li>
              <Link to="/products">Proizvodi</Link>
            </li>
            <li>
              <Link to="/contact">Kontakt</Link>
            </li>
            <li>
              <Link to="/login">Prijava</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  } else {
    return 0;
  }
}

export default Header;
