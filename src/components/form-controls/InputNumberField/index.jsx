import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

InputNumberField.propTypes = {
  form: PropTypes.object.isRequired, // hai cai quan trong nhat
  name: PropTypes.string.isRequired, // ptsr la pt proptypes, s tring, r isrequired

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputNumberField(props) {
  const { form, name, label, disabled, size } = props;
  const { errors } = form;
  const hasError = errors[name];

  return (
    <Controller // Controller dung thay the cho textfield thuong
      name={name} // cai ni chac chan phai co
      control={form.control} // cai ni chac chan phai co
      render={({ onChange, onBlur, value, name }) => (
        <TextField
          margin="normal"
          variant="outlined"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          size={size}
          label={label}
          disabled={disabled}
          error={!!hasError}
          helperText={errors[name]?.message}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
    />
  );
}

export default InputNumberField;
