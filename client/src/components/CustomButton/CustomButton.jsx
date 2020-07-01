import React from 'react';
import './CustomButton.styles.css';
const CustomButton = ({ children, invert, onClick }) => {
  return (
    <button
      className={`${invert ? 'custom-button' : 'custom-no-invert'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;
