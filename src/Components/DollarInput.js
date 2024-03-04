import React from 'react';

const DollarInput = ({ value, onChange, ...rest }) => {
  const handleChange = (event) => {
    const inputValue = event.target.value;
    const formattedValue = `$${inputValue}`; // Add a dollar sign before the input value
    onChange(formattedValue);
  };

  return <input type="text" value={value} onChange={handleChange} {...rest} />;
};

export default DollarInput;
