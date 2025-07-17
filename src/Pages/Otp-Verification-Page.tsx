import React from 'react';
import OtpVerification from '../Components/Otp-Verification';
import { useNavigate } from "react-router-dom";
const OtpScreen: React.FC = () => {
    
    const navigate = useNavigate();
  const handleSuccess = () => {
    console.log('OTP verified, continue...');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <OtpVerification
      otpLength={6}
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
