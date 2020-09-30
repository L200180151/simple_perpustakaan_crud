import React from 'react';
import { TextField } from '@material-ui/core';

const CustomTextField = ({
  name,
  label,
  value,
  handleInputChange,
  errorAttribute,
}) => {
  if (label.includes('_')) {
    label = label.split('_').join(' ');
  }
  return (
    <TextField
      name={name}
      variant="outlined"
      label={label}
      value={value}
      onChange={handleInputChange}
      fullWidth
      inputProps={{
        maxLength: 45,
      }}
      {...errorAttribute}
    />
  );
};

export default CustomTextField;
