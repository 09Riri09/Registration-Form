import React from "react";
import "./NavbarStyling.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/jblogosquare.png" className="logo-img" />
        <span className="logo-text">Qodana</span>
      </div>
    </nav>
  );
}

export default Navbar;
