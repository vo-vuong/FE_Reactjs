import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import ChangePassForm from '../ChangePassForm';
import userApi from 'api/userApi';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'features/Auth/userSlice';

ChangePass.propTypes = {
  closeDialog: PropTypes.func,
};

function ChangePass(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const handleLoginFormSubmit = async (values) => {
    try {
      const result = await userApi.changepassword(values);
      const action = logout();
      dispatch(action);
      history.push('/');
      enqueueSnackbar(result.message, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <div>
      <ChangePassForm onSubmit={handleLoginFormSubmit} />
    </div>
  );
}

export default ChangePass;
