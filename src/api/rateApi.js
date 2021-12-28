import axiosAdmin from './axiosAdmin';
import axiosClient from './axiosClient';

const rateApi = {
  getAllAdmin(params) {
    const url = '/rate';
    return axiosAdmin.get(url, { params });
  },

  get(id) {
    const url = `/rate/${id}`;
    return axiosClient.get(url);
  },

  addClient(data) {
    const url = '/rate';
    return axiosClient.post(url, data);
  },

  addClientReply(data) {
    const url = '/rateReply';
    return axiosClient.post(url, data);
  },

  updateAdmin(data) {
    const url = '/rate';
    return axiosAdmin.post(url, data);
  },

  update(data) {
    const url = `/rate/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/rate/${id}`;
    return axiosClient.delete(url);
  },

  removeAdmin(id) {
    const url = `/rate/${id}`;
    return axiosAdmin.delete(url);
  },
};

export default rateApi;
