import React, { useEffect } from 'react';
import OtpVerification from '../Components/Otp-Verification';
import { useNavigate } from "react-router-dom";
import { useAuthFlow } from '../Context/Context';

const OtpScreen: React.FC = () => {
    
    const navigate = useNavigate();
    const { phoneNumber } = useAuthFlow();

    useEffect(() => {
      if (!phoneNumber) {
        console.warn('No phone number found in context. Redirecting back.');
        navigate(-1);
      }
    }, [phoneNumber, navigate]);

  const handleSuccess = () => {
    navigate('/Signup-Form'); 
    console.log('OTP verified, continue...');
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!phoneNumber) {
    return null; // or a loading indicator/message
  }

  return (
    <OtpVerification
      otpLength={6}
      phoneNumber={phoneNumber}
      title="OTP Verification"
      subtitle="Enter the code sent to"
      resendText="Resend Code"
      onSuccess={handleSuccess}
      onBack={handleBack}
    />
  );
};

export default OtpScreen;