import axiosAdmin from './axiosAdmin';
import axiosClient from './axiosClient';

const orderApi = {
  getAll(params) {
    const url = '/order';
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `/order/${id}`;
    return axiosClient.get(url);
  },

  addClient(data) {
    const url = '/order';
    return axiosClient.post(url, data);
  },

  updateAdmin(data) {
    const url = '/order';
    return axiosAdmin.post(url, data);
  },

  update(data) {
    const url = `/order/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/order/${id}`;
    return axiosClient.delete(url);
  },

  removeAdmin(id) {
    const url = `/order/${id}`;
    return axiosAdmin.delete(url);
  },
};

export default orderApi;
