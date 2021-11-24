import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'features/Auth/userSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';

Register.propTypes = {};

function Register(props) {
  const dispatch = useDispatch();

  const handleRegisterFormSubmit = async (values) => {
    // console.log('Lam gi do sau khi form submit');
    // console.log('Form Register Submit:', values);
    try {
      const action = register(values); // values la truy vao cai payload ben userSlice
      const resultAction = await dispatch(action); // gọi api đang ki ben userSlice xong doi no
      const user = unwrapResult(resultAction);
      console.log('New user', user);
    } catch (error) {
      console.log('Failed to register:', error);
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleRegisterFormSubmit} />
    </div>
  );
}

export default Register;
