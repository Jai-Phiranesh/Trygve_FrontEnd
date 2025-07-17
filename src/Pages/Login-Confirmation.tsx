import React from 'react';
import Confirmation from '../Components/Confirmation';


const WelcomeConfirmation: React.FC = () => {
  const handleBack = () => {
    console.log('Going back...');
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