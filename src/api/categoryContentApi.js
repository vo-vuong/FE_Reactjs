import axiosAdmin from './axiosAdmin';
import axiosClient from './axiosClient';

const categoryContentApi = {
  getAll(params) {
    const url = '/categoryNew';
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `/categoryNew/${id}`;
    return axiosClient.get(url);
  },

  addAdmin(data) {
    const url = '/categoryNew';
    return axiosAdmin.post(url, data);
  },

  updateAdmin(data) {
    const url = '/categoryNew';
    return axiosAdmin.post(url, data);
  },

  update(data) {
    const url = `/categoryNew/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/categoryNew/${id}`;
    return axiosClient.delete(url);
  },

  removeAdmin(id) {
    const url = `/categoryNew/${id}`;
    return axiosAdmin.delete(url);
  },
};

export default categoryContentApi;
