import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  form: PropTypes.object.isRequired, // hai cai quan trong nhat
  name: PropTypes.string.isRequired, // ptsr la pt proptypes, s tring, r isrequired

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled } = props;
  const { errors, formState } = form;
  const hasError = formState.touched[name] && errors[name];

  return (
    <Controller // Controller dung thay the cho textfield thuong
      name={name} // cai ni chac chan phai co
      control={form.control} // cai ni chac chan phai co
      as={TextField}
      //
      fullWidth
      label={label}
      disabled={disabled}
      //
      error={!!hasError} // ep boolean gi do
      helperText={errors[name]?.message} //luc nao co moi show
    />
  );
}

export default InputField;
