import React, { useState } from "react";
import { Link } from "react-router-dom";
import TweetX from "../../assets/TweetX.png";
import Menu from "../../assets/menu.png";
import useIsMobile from "../../hooks/useMobile.jsx";
import "./Navbar.css";

const Navbar = () => {
  const isMobileScreen = useIsMobile();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <div className="navbar">
      <div className="content">
        <Link to="/" className="logo">
          <img src={TweetX} alt="TweetX Logo" />
        </Link>
        <div
          className={`nav-links ${
            isMobileScreen ? (isMobileMenuOpen ? "active" : "") : ""
          }`}
        >
          <Link to="/" className="nav-link">
            Feed
          </Link>
          <Link to="/users" className="nav-link">
            Users
          </Link>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </div>
        {isMobileScreen && (
          <div className="menu-icon" onClick={toggleMobileMenu}>
            <img src={Menu} alt="Mobile Menu" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
