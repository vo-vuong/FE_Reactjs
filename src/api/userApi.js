import axiosClient from './axiosClient';
import axiosAdmin from './axiosAdmin';

const userApi = {
  register(data) {
    const url = '/register';
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = '/authenticate';
    return axiosClient.post(url, data);
  },
  forgotpassword(data) {
    const url = '/forgotpassword';
    return axiosClient.post(url, data);
  },
  changepassword(data) {
    const url = '/changepassword';
    return axiosAdmin.post(url, data);
  },
  getUser(params) {
    const url = '/userinfo';
    return axiosAdmin.get(url, { params });
  },
};

export default userApi;
