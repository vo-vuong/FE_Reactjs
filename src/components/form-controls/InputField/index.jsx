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
  return (
    <Controller // Controller dung thay the cho textfield thuong
      name={name} // cai ni chac chan phai co
      control={form.control} // cai ni chac chan phai co
      as={TextField}
      fullWidth
      label={label}
      disabled={disabled}
    />
  );
}

export default InputField;
