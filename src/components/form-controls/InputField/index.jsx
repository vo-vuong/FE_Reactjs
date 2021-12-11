import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  form: PropTypes.object.isRequired, // hai cai quan trong nhat
  name: PropTypes.string.isRequired, // ptsr la pt proptypes, s tring, r isrequired

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
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
          fullWidth
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
      // as={TextField}
      // margin="normal"
      // variant="outlined"
      // fullWidth
      // label={label}
      // disabled={disabled}
      //
      // error={!!hasError} // ep boolean gi do
      // helperText={errors[name]?.message} //luc nao co moi show
    />
  );
}

export default InputField;
