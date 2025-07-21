import React from 'react';
import OtpVerification from '../Components/Otp-Verification';
import { useNavigate } from "react-router-dom";
import { AuthFlowProvider, useAuthFlow } from '../Context/Context';
const OtpScreen: React.FC = () => {
     const { phoneNumber } = useAuthFlow();
    const navigate = useNavigate();
  const handleSuccess = () => {
    navigate('/login-Confirmation'); // Navigate to home page on success
    console.log('OTP verified, continue...');
  };

  const handleBack = () => {
    navigate(-1);
  };
  console.log(phoneNumber);
  return (
    <AuthFlowProvider>
    <OtpVerification
      otpLength={6}
       phoneNumber={phoneNumber ?? ''}
       
      title="OTP Verification"
      subtitle="Enter the code sent to"
      resendText="Resend Code"
      onSuccess={handleSuccess}
      onBack={handleBack}
    />
    </AuthFlowProvider>
  );
};

export default OtpScreen;
