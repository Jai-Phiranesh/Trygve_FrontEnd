import React, { useState } from "react";
import "../Styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useAuthFlow } from '../Context/Context'; // <-- import
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const { setPhoneNumber } = useAuthFlow();

  const auth = getAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanedInputPhone = phone.replace(/\D/g, "").slice(-10);
    const fullPhone = "+91" + cleanedInputPhone;

    if (!email || cleanedInputPhone.length !== 10) {
      alert("Please enter valid email and phone number.");
      return;
    }

    // Setup invisible reCAPTCHA
    interface WindowWithRecaptcha extends Window {
      recaptchaVerifier?: RecaptchaVerifier;
    }
    const customWindow = window as WindowWithRecaptcha;
    if (!customWindow.recaptchaVerifier) {
      customWindow.recaptchaVerifier = new RecaptchaVerifier(
        auth, // Auth object first
        "recaptcha-container", // Container ID string second
        { size: "invisible" }
      );
    }

    try {
      await signInWithPhoneNumber(auth, fullPhone, customWindow.recaptchaVerifier as RecaptchaVerifier);
      setPhoneNumber(fullPhone);
      navigate("/login-otp");
      alert("OTP sent!");
    } catch (error: unknown) {
      if (typeof error === "object" && error && "code" in error) {
        const err = error as { code?: string; message?: string };
        if (err.code === "auth/user-not-found") {
          alert("Phone number not registered.");
        } else {
          alert(err.message || "Failed to send OTP.");
        }
      } else {
        alert("Failed to send OTP.");
      }
    }
  };

  return (
    <div className="login-container">
      <div id="recaptcha-container" style={{ display: "none" }} />
      <div className="login-image-section">
        <img
          src="/login-logo.png"
          alt="Security Illustration"
          className="login-top-image"
        />
      </div>
      <h1 className="login-heading">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-input-group">
          <label htmlFor="email">Email</label>
          <div className="input-with-icon">
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
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
            placeholder="Enter 10 Digit Number"
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
