import axiosAdmin from './axiosAdmin';
import axiosClient from './axiosClient';

const originApi = {
  getAll(params) {
    const url = '/origin';
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `/origin/${id}`;
    return axiosClient.get(url);
  },

  addAdmin(data) {
    const url = '/origin';
    return axiosAdmin.post(url, data);
  },

  updateAdmin(data) {
    const url = '/origin';
    return axiosAdmin.post(url, data);
  },

  update(data) {
    const url = `/origin/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/origin/${id}`;
    return axiosClient.delete(url);
  },

  removeAdmin(id) {
    const url = `/origin/${id}`;
    return axiosAdmin.delete(url);
  },
};

export default originApi;
