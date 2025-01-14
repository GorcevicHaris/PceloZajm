import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <h1>🐝 Pčelarstvo</h1>
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
}

export default Header;
