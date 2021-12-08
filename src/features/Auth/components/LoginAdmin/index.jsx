import { unwrapResult } from '@reduxjs/toolkit';
import { login } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import LoginForm from '../LoginForm';

LoginAdmin.propTypes = {};

function LoginAdmin(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleLoginFormSubmit = async (values) => {
    // console.log('Lam gi do sau khi form submit');
    try {
      const action = login(values); // values la truy vao cai payload ben userSlice
      const resultAction = await dispatch(action); // gọi api đang ki ben userSlice xong doi no
      unwrapResult(resultAction);

      history.push('/admin');
      // close dialog
    } catch (error) {
      // console.log('Failed to register:', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleLoginFormSubmit} />
    </div>
  );
}

export default LoginAdmin;
