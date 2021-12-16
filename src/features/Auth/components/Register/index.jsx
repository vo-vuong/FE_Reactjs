import userApi from 'api/userApi';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';

Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleRegisterFormSubmit = async (values) => {
    try {
      // const action = register(values); // values la truy vao cai payload ben userSlice
      // const resultAction = await dispatch(action); // gọi api đang ki ben userSlice xong doi no
      // unwrapResult(resultAction);
      const { message, object } = await userApi.register(values);

      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }

      enqueueSnackbar(message, { variant: 'success' });
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
