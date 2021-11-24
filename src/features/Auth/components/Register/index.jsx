import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';
import PropTypes from 'prop-types';

Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleRegisterFormSubmit = async (values) => {
    // console.log('Lam gi do sau khi form submit');
    // console.log('Form Register Submit:', values);
    try {
      const action = register(values); // values la truy vao cai payload ben userSlice
      const resultAction = await dispatch(action); // gọi api đang ki ben userSlice xong doi no
      const user = unwrapResult(resultAction);

      // close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
      // O day user dang ki thanh cong
      console.log('New user', user);
      enqueueSnackbar('Bạn đã đăng kí thành công.', { variant: 'success' });
    } catch (error) {
      // console.log('Failed to register:', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleRegisterFormSubmit} />
    </div>
  );
}

export default Register;
