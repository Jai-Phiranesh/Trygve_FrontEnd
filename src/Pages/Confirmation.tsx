// Example usage in a parent component like ConfirmationPage.tsx

import React from "react";
import Confirmation from "../Components/Confirmation";
import { useNavigate } from "react-router-dom";
import doneImage from "/Done.png";
import sideImage from "/1.png";

const ConfirmationPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Confirmation
     title="You're now with your Trusted Guardian of Life!"
     subtitle="Welcome to the TRYGVE Family! Your journey to better health starts here."
      buttonText="Login Now"
      onBack={() => navigate(-1)} 
      onButtonClick={() => navigate("/home-Page")}
      confirmationImageSrc={doneImage}
      sideImageSrc={sideImage}
    />
  );
};

export default ConfirmationPage;
