import axiosAdmin from './axiosAdmin';
import axiosClient from './axiosClient';

const categoryApi = {
  getAll(params) {
    const url = '/category';
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `/category/${id}`;
    return axiosClient.get(url);
  },

  addAdmin(data) {
    const url = '/category';
    return axiosAdmin.post(url, data);
  },

  update(data) {
    const url = `/category/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/category/${id}`;
    return axiosClient.delete(url);
  },

  removeAdmin(id) {
    const url = `/category/${id}`;
    return axiosAdmin.delete(url);
  },
};

export default categoryApi;
