import axiosAdmin from './axiosAdmin';
import axiosClient from './axiosClient';

const cartApi = {
  getAll(params) {
    const url = '/cart';
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `/cart/${id}`;
    return axiosClient.get(url);
  },

  addClient(data) {
    const url = '/cart';
    return axiosClient.post(url, data);
  },

  addAdmin(data) {
    const url = '/cart';
    return axiosAdmin.post(url, data);
  },

  updateAdmin(data) {
    const url = '/cart';
    return axiosAdmin.post(url, data);
  },

  update(data) {
    const url = `/cart/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/cart/${id}`;
    return axiosClient.delete(url);
  },

  removeAdmin(id) {
    const url = `/cart/${id}`;
    return axiosAdmin.delete(url);
  },
};

export default cartApi;
