import userApi from 'api/userApi';
import StorageKeys from 'constants/storage-keys';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormUserInfo from './components/FormUserInfo';
import { refreshCurrent } from 'features/Auth/userSlice';

UserInfo.propTypes = {
  closeDialog: PropTypes.func,
};

function UserInfo(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem(StorageKeys.USER)));
  const dispatch = useDispatch();

  const handleFormUserInfoSubmit = async (values) => {
    try {
      const result = await userApi.userInfo(values);
      const userInforUpdate = {
        ...userInfo,
        ...values,
      };
      localStorage.setItem(StorageKeys.USER, JSON.stringify(userInforUpdate));
      const action = refreshCurrent();
      dispatch(action);

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
