import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>ProDeck</h2>
      </div>
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <a href="#home" onClick={toggleMenu}>Home</a>
        <a href="#about" onClick={toggleMenu}>About</a>
        <a href="#create-project" onClick={toggleMenu}>Create Project</a>
        <a href="#contact" onClick={toggleMenu}>Contact</a>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <span className={`line ${isOpen ? "open" : ""}`}></span>
        <span className={`line ${isOpen ? "open" : ""}`}></span>
        <span className={`line ${isOpen ? "open" : ""}`}></span>
      </div>
    </nav>
  );
};

export default Navbar;
