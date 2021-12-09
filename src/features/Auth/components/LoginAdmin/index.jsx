import { unwrapResult } from '@reduxjs/toolkit';
import { loginAdmin } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import { useHistory } from 'react-router';
import LoginForm from '../LoginForm';

LoginAdmin.propTypes = {};

function LoginAdmin(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleLoginFormSubmit = async (values) => {
    // console.log('Lam gi do sau khi form submit');
    try {
      const action = loginAdmin(values); // values la truy vao cai payload ben userSlice
      const resultAction = await dispatch(action); // gọi api đang ki ben userSlice xong doi no
      const user = unwrapResult(resultAction);
      const isLoggedInAdmin = !!(user.roles === 'ROLE_ADMIN');

      if (isLoggedInAdmin) {
        history.push('/admin');
      } else {
        console.log(isLoggedInAdmin);
      }

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
