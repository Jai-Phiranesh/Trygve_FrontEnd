import React, { useEffect, useState } from 'react';
import '../Styles/Otp-Verification.css';
import { useNavigate } from 'react-router-dom';

interface OtpVerificationProps {
  otpLength: number;
  phoneNumber: string;
  title: string;
  subtitle: string;
  resendText: string;
  onSuccess: () => void;
  onBack: () => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({
  otpLength,
  phoneNumber,
  title,
  subtitle,
  resendText,
  onSuccess,
  onBack,
}) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(''));

  // Generate and store OTP
  const generateAndStoreOtp = () => {
    const generatedOtp = Array.from({ length: otpLength }, () =>
      Math.floor(Math.random() * 10)
    ).join('');
    localStorage.setItem('otp', JSON.stringify({ otp: generatedOtp }));
    console.log('Generated OTP:', generatedOtp);
  };

  useEffect(() => {
    generateAndStoreOtp();
  }, [otpLength]);

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const updated = [...otp];
      updated[index] = value;
      setOtp(updated);

      const next = document.getElementById(`otp-${index + 1}`);
      if (value && next) (next as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      if (prev) (prev as HTMLInputElement).focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    const stored = localStorage.getItem('otp');
    const savedOtp = stored ? JSON.parse(stored).otp : null;

    if (!savedOtp) {
      alert('OTP expired or not generated.');
      return;
    }

    if (enteredOtp === savedOtp) {
      alert('✅ OTP verified!');
      onSuccess();
      navigate('/Signup-Form');
    } else {
      alert('❌ Invalid OTP. Try again.');
    }
  };

  const handleResend = () => {
    generateAndStoreOtp();
    alert('🔁 OTP resent!');
  };

  const maskedPhone = phoneNumber.replace(/^(\+91)?(\d{2})\d{4}(\d{2})$/, '+91 $2****$3');

  return (
    <div className="otp-wrapper">
      <div className="otp-left" />

      <div className="otp-container">
        <div className="otp-back" onClick={onBack}>←</div>

        <h2 className="otp-heading">{title}</h2>
        <p className="otp-subtext">
          {subtitle} {maskedPhone}.
        </p>

        <div className="otp-input-group">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="otp-input"
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
            />
          ))}
        </div>

        <p className="otp-resend">
          Didn’t receive code?{' '}
          <span onClick={handleResend} style={{ cursor: 'pointer', color: '#005ce6' }}>
            {resendText}
          </span>
        </p>

        <div className="otp-logo" />

        <button className="otp-verify-btn" onClick={handleVerify}>
          Verify
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;
