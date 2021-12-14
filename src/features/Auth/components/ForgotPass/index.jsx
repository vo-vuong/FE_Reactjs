import userApi from 'api/userApi';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import ForgotPassForm from '../ForgotPassForm';

ForgotPass.propTypes = {
  closeDialog: PropTypes.func,
};

function ForgotPass(props) {
  const { enqueueSnackbar } = useSnackbar();

  const handleForgotPassFormSubmit = async (values) => {
    try {
      const { message } = await userApi.forgotpassword(values);

      if (message !== 'Email không hợp lệ !') {
        const { closeDialog } = props;
        if (closeDialog) {
          closeDialog();
        }
        enqueueSnackbar(message, { variant: 'success' });
      } else {
        enqueueSnackbar(message, { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <div>
      <ForgotPassForm onSubmit={handleForgotPassFormSubmit} />
    </div>
  );
}

export default ForgotPass;
