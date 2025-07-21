/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useRef } from 'react';
import '../Styles/Otp-Verification.css';
import { RecaptchaVerifier } from 'firebase/auth';
import { sendOtp, verifyOtp } from '../FireBase/Auth';
import { useAuthFlow } from '../Context/Context';
import { auth } from '../FireBase/Config';

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
  const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(''));
  const { confirmationResult, setConfirmationResult } = useAuthFlow();
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  const recaptchaContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setConfirmationResult(null); // Clear previous confirmationResult when phoneNumber changes
    if (!recaptchaContainerRef.current) return;

    const verifier = new RecaptchaVerifier(auth, recaptchaContainerRef.current, {
      size: 'invisible',
    });
    recaptchaVerifierRef.current = verifier;

    sendOtp(phoneNumber, verifier)
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult);
      })
      .catch((error) => {
        console.error('Error sending OTP:', error);
      });

    return () => {
      verifier.clear();
    };
  }, [phoneNumber, setConfirmationResult]);

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

  const handleVerify = async () => {
    const enteredOtp = otp.join('');

    if (!confirmationResult) {
      alert('OTP expired or not generated.');
      return;
    }

    try {
      const userCredential = await verifyOtp(confirmationResult, enteredOtp);
      const tokenId = await userCredential.user.getIdToken();
      localStorage.setItem('authToken', JSON.stringify({ tokenId }));
      alert('✅ OTP verified!');
      onSuccess();
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('❌ Invalid OTP. Try again.');
    }
  };

  const handleResend = () => {
    const verifier = recaptchaVerifierRef.current;
    if (verifier) {
      console.log(phoneNumber);
      sendOtp(phoneNumber, verifier)
        .then((confirmationResult) => {
          setConfirmationResult(confirmationResult);
          alert('🔁 OTP resent!');
        })
        .catch((error) => {
          console.error('Error resending OTP:', error);
          alert('Failed to resend OTP. Please try again.');
        });
    } else {
      alert('reCAPTCHA not initialized. Please refresh the page.');
    }
  };

  const maskedPhone = phoneNumber.replace(/^\(\+91\)?(\d{2})\d{4}(\d{2})$/, '+91 $2****$3');

  return (
    <div className="otp-wrapper">
      <div className="otp-left" />

      <div className="otp-container">
        <div className="back-wrapper">
          <div className="otp-back" onClick={onBack}>←</div>
        </div>
        <div id="recaptcha-container" ref={recaptchaContainerRef}></div>
        <div className="otp-content-center">
          <div className="otp-header">
            <h2 className="otp-heading">{title}</h2>
          </div>
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
            <span onClick={handleResend}>
              {resendText}
            </span>
          </p>
          <div className="otp-logo" />
          <button className="otp-verify-btn" onClick={handleVerify}>
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
