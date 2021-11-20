import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

InputField.propTypes = {
  form: PropTypes.object.isRequired, // hai cai quan trong nhat
  name: PropTypes.string.isRequired, // ptsr la pt proptypes, s tring, r isrequired

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, lable, disabled } = props;
  return (
    <div>
      <TextField fullWidth />
    </div>
  );
}

export default InputField;
