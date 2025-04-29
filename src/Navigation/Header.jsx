import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { Context } from "../Context";

function Header() {
  const navigate = useNavigate();
  const { userId } = useContext(Context);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  console.log(userId, "userid");

  if (!userId) {
    return (
      <header className="header">
        <div className="header-logo">
          <h1 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            🐝 Pčelarstvo
          </h1>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`hamburger ${isMenuOpen ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <nav className={`header-nav ${isMenuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Početna
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                O nama
              </Link>
            </li>
            <li>
              <Link to="/statistika" onClick={() => setIsMenuOpen(false)}>
                Statistika
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                Kontakt
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                Prijava
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  } else {
    return null;
  }
}

export default Header;
