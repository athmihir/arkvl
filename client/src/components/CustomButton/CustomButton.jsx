import React from 'react';
import './CustomButton.styles.css';
const CustomButton = ({
  children,
  invert,
  onClick,
  small,
  type,
  style,
  link,
}) => {
  return (
    <button
      className={`${
        link
          ? 'link-button'
          : `${invert ? 'custom-button' : 'custom-no-invert'} ${
              small ? `small` : ''
            }`
      }`}
      style={style}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;
