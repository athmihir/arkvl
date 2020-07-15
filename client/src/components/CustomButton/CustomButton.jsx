import React from 'react';
import './CustomButton.styles.css';
const CustomButton = ({ children, invert, onClick, small }) => {
  return (
    <button
      className={`${invert ? 'custom-button' : 'custom-no-invert'} ${
        small ? `small` : ''
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;
