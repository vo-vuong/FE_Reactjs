import userApi from 'api/userApi';
import StorageKeys from 'constants/storage-keys';
import { refreshCurrent } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormUserInfo from './components/FormUserInfo';

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
      console.log(values);
      const userInforUpdate = {
        ...userInfo,
        ...values,
      };
      localStorage.setItem(StorageKeys.USER, JSON.stringify(userInforUpdate));
      const action = refreshCurrent();
      dispatch(action);

      enqueueSnackbar('Cập nhật tài khoản thành công.', { variant: 'success' });
    } catch (error) {
      console.log(error.response.data.message);
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  };

  return (
    <div>
      <FormUserInfo onSubmit={handleFormUserInfoSubmit} userInfo={userInfo} />
    </div>
  );
}

export default UserInfo;
