// src/components/Confirmation.tsx
import React from "react";
import "../Styles/Confirmation.css";

export interface ConfirmationProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onBack: () => void;
  onButtonClick: () => void;
  confirmationImageSrc: string;
  sideImageSrc: string;
}

const Confirmation: React.FC<ConfirmationProps> = ({
  title,
  subtitle,
  buttonText,
  onBack,
  onButtonClick,
  confirmationImageSrc,
  sideImageSrc,
}) => {
  return (
    <div className="confirmation-container">
      <div className="confirmation-left">
        <img src={sideImageSrc} alt="Side" className="side-image" />
      </div>

      <div className="confirmation-right">
        <div className="confirmation-back" onClick={onBack}>
          &#8592;
        </div>
        <img src={confirmationImageSrc} alt="Done" className="confirmation-icon" />
        <h2 className="confirmation-title">{title}</h2>
        <p className="confirmation-subtitle">{subtitle}</p>
        <div className="bag-logo" />
        <button className="confirmation-button" onClick={onButtonClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};
export default Confirmation;