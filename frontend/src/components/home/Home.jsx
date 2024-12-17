// src/components/Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Study Buddy</h1>
      <p className="home-description">
        Your personalized learning companion. Start your learning journey today by selecting your study options.
      </p>
      <Link to="/questionnaire">
        <button className="start-button">Get Started</button>
      </Link>
    </div>
  );
}

export default Home;
