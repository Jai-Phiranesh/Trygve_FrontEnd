import React from 'react';
import Confirmation from '../Components/Confirmation';
import { useNavigate } from 'react-router-dom';


const WelcomeConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const handleContinue = () => {
    console.log('Continue clicked...');
    alert('Welcome! Continuing to next step...');
  };

  return (
    <Confirmation
      title="Welcome Back to TRYGVE!"
      subtitle="Your trusted guardian of life is ready to serve you."
      buttonText="Continue"
      onBack={handleBack}
      onButtonClick={handleContinue}
      confirmationImageSrc="/Done2.png"
      sideImageSrc="/4.png"
    />
  );
};

export default WelcomeConfirmation;