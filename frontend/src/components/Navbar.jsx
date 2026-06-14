import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="GitHub Logo"
          className="navbar-logo"
        />
        <h3 className="navbar-title">GitHub</h3>
      </Link>

      <div className="navbar-links">
        <Link to="/create" className="navbar-link">
          + Create Repository
        </Link>
        <Link to="/profile" className="navbar-link navbar-link-profile">
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;