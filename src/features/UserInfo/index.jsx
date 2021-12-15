import userApi from 'api/userApi';
import { logout } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FormUserInfo from './components/FormUserInfo';
import StorageKeys from 'constants/storage-keys';

UserInfo.propTypes = {
  closeDialog: PropTypes.func,
};

function UserInfo(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem(StorageKeys.USER)));

  const handleFormUserInfoSubmit = async (values) => {
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
      <FormUserInfo onSubmit={handleFormUserInfoSubmit} userInfo={userInfo} />
    </div>
  );
}

export default UserInfo;
