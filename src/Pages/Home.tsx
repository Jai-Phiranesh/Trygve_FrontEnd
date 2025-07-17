import React from 'react';
import "../Styles/Home.css";
import { useNavigate } from 'react-router-dom';





const GettingStarted: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="onboarding-container">
      <div className="background-logo" />
      
      <div className="logo-overlay">
        <h2 className="welcome-text">Welcome to</h2>
        <h1 className="brand-name">trygve</h1>
        <p className="tagline">
          "Your trusted partner for personalized healthcare, right at your doorstep."
        </p>
        <div className="button-group">
          <button className="btn primary" onClick={() => navigate('/Signup-Page')}>
  Sign up
</button>
          <button className="btn secondary">Log in</button>
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;
