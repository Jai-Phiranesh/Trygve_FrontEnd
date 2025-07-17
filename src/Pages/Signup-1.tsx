import React, { useState } from 'react';
import '../Styles/Signup-1.css';
import { useNavigate } from 'react-router-dom';

const Signup1: React.FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePhone = (num: string): boolean => /^[6-9]\d{9}$/.test(num);

  const handleSendCode = () => {
    if (!validatePhone(phone)) {
      setError('Enter a valid 10-digit Indian mobile number.');
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/Otp-Verification'); // ✅ Navigate to OTP verification page
      // navigate('/signup2');
    }, 1000);
  };

  return (
    <div className="signup1-wrapper">
      {/* ✅ LEFT LOGO SECTION (only visible on desktop) */}
      <div className="signup1-left" />

      {/* ✅ RIGHT CONTENT SECTION */}
      <div className="signup1-container">
        <div className="back-arrow" onClick={() => navigate(-1)}>←</div>

        <h2 className="heading">Can you input your number?</h2>
        <p className="subtext">
          You will be sent a code on this number to verify if you are the owner of the number.
        </p>

        <div className="input-row">
          <div className="country-code">🇮🇳 +91</div>
          <input
            type="tel"
            className="number-input"
            placeholder="12345 67890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <div className="bag-logo" />
        <button
          className={`send-btn ${loading ? 'loading' : ''}`}
          onClick={handleSendCode}
        >
          {loading ? 'Sending...' : 'Send Code'}
        </button>

        <p className="login-redirect">
          Already have an account? <span onClick={() => navigate('/login')}>Log in</span>
        </p>
      </div>
    </div>
  );
};

export default Signup1;
