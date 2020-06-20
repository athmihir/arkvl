import React from 'react';
import './InputField.styles.css';
const InputField = ({ label, ...props }) => {
  return (
    <div className="input-div">
      <input {...props} className="form-input" />
      {label ? <label className="form-label">{label}</label> : null}
    </div>
  );
};

export default InputField;
