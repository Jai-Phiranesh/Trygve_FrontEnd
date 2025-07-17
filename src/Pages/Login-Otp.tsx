import React from 'react';
import OtpVerification from '../Components/Otp-Verification';
import { useNavigate } from "react-router-dom";
const OtpScreen: React.FC = () => {
    
    const navigate = useNavigate();
  const handleSuccess = () => {
    navigate('/first'); // Navigate to home page on success
    console.log('OTP verified, continue...');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <OtpVerification
      otpLength={4}
      phoneNumber="+919876543210"
      title="OTP Verification"
      subtitle="Enter the code sent to"
      resendText="Resend Code"
      onSuccess={handleSuccess}
      onBack={handleBack}
    />
  );
};

export default OtpScreen;
