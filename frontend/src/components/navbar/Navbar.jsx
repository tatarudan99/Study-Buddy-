// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Study Buddy</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/questionnaire">Questionnaire</Link></li>
        <li><Link to="/study">Study Session</Link></li>
        
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
