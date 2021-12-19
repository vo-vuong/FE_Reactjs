import axiosAdmin from './axiosAdmin';
import axiosClient from './axiosClient';

const commentApi = {
  getAllAdmin(params) {
    const url = '/comment';
    return axiosAdmin.get(url, { params });
  },

  get(id) {
    const url = `/comment/${id}`;
    return axiosClient.get(url);
  },

  addClient(data) {
    const url = '/comment';
    return axiosClient.post(url, data);
  },

  updateAdmin(data) {
    const url = '/comment';
    return axiosAdmin.post(url, data);
  },

  update(data) {
    const url = `/comment/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/comment/${id}`;
    return axiosClient.delete(url);
  },

  removeAdmin(id) {
    const url = `/comment/${id}`;
    return axiosAdmin.delete(url);
  },
};

export default commentApi;
