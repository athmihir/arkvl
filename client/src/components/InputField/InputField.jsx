/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './InputField.styles.css';

const InputField = ({ label, ...props }) => (
  <div className="input-div">
    <input {...props} className="form-input" />
    {label ? <label className="form-label">{label}</label> : null}
  </div>
);

export default InputField;
