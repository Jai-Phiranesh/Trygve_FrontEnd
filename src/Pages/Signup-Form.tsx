import React, { useState } from 'react';
import '../styles/Signup-Form.css';
import { useNavigate } from 'react-router-dom';

const SignupForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    area: '',
    secondaryPhone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPhone = (phone: string) =>
    /^\d{10}$/.test(phone);

  const handleSubmit = () => {
    if (!isValidEmail(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!isValidPhone(formData.secondaryPhone)) {
      alert('Please enter a valid 10-digit secondary phone number.');
      return;
    }

    localStorage.setItem('signupInfo', JSON.stringify(formData));
    navigate('/Confirmation');
    alert('Account Created & Info Stored!');
  };

  return (
    <div className="signup-container">
      

      <div className="form-section">
        <div className="form-wrapper">
          <div className="back-arrow" onClick={() => navigate(-1)}>←</div>
          <h2>Almost Done!</h2>
          <p>Please enter your details in the following section.</p>

          <div className="form-fields">
            <input
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="area"
              placeholder="Enter Area"
              value={formData.area}
              onChange={handleChange}
            />
            <input
              type="text"
              name="secondaryPhone"
              placeholder="Enter Secondary Phone Number"
              value={formData.secondaryPhone}
              onChange={handleChange}
            />
          </div>

          <button className="submit-button" onClick={handleSubmit}>
            Create Account
          </button>
        </div>
        <img src={'/public/logo.png'} alt="Logo Watermark" className="background-logo" />
      </div>
    </div>
  );
};

export default SignupForm;
