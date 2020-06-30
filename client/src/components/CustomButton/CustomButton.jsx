import React from 'react';
import './CustomButton.styles.css';
const CustomButton = ({ children, invert }) => {
  return (
    <button className={`${invert ? 'custom-button' : 'custom-no-invert'}`}>
      {children}
    </button>
  );
};

export default CustomButton;
