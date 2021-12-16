import userApi from 'api/userApi';
import StorageKeys from 'constants/storage-keys';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import FormUserInfo from './components/FormUserInfo';

UserInfo.propTypes = {
  closeDialog: PropTypes.func,
};

function UserInfo(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem(StorageKeys.USER)));

  const handleFormUserInfoSubmit = async (values) => {
    try {
      const result = await userApi.userInfo(values);
      const userInforUpdate = {
        ...userInfo,
        ...values,
      };
      localStorage.setItem(StorageKeys.USER, JSON.stringify(userInforUpdate));

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
