import React, { useState } from "react";
import "../Styles/Login.css";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("dscode@gmail.com");
  const [phone, setPhone] = useState("+91 79041 62755");
  const navigate = useNavigate();

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const userDataString = localStorage.getItem("signupInfo"); 


  if (userDataString) {
    const userData = JSON.parse(userDataString);

    const cleanedInputPhone = phone.replace(/\D/g, "").slice(-10); // keep only last 10 digits

    if (
      userData.email.toLowerCase() === email.toLowerCase() &&
      userData.secondaryPhone === cleanedInputPhone
    ) {
        navigate("/login-otp"); // Navigate to OTP verification page
      alert("Login successful!");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  } else {
    alert("No user data found in localStorage.");
  }
};

  return (
    <div className="login-container">
      <div className="login-image-section">
        <img
          src="/login-logo.png"
          alt="Security Illustration"
          className="login-top-image"
        />
      </div>
      <h1 className="login-heading">Login</h1>
      <p className="login-subtext">Enter email and phone number to continue</p>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-input-group">
          <label htmlFor="email">Email Id</label>
          <div className="input-with-icon">
            <input
              type="email"
              id="email"
              placeholder="dscode@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="edit-icon">✎</span>
          </div>
        </div>

        <div className="login-input-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            placeholder="+91 79041 62755"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-continue-button">
          Continue
        </button>
      </form>
    </div>
  );
};

export default Login;
