import axiosAdmin from './axiosAdmin';
import axiosClient from './axiosClient';

const accountsApi = {
  async getAll(params) {
    // console.log(params.filters);
    const productList = await axiosClient.get('/product', { params: params.filters });
    // console.log(productList.list);
    return {
      data: productList.list,
      pagination: { page: productList.page, totalPage: productList.totalPage },
    };
  },

  getAllAdmin(params) {
    const url = '/admin/user';
    return axiosAdmin.get(url, { params });
  },

  get(id) {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },

  addAdmin(data) {
    const url = '/admin/user';
    return axiosAdmin.post(url, data);
  },

  remove(id) {
    const url = `/admin/user/${id}`;
    return axiosAdmin.delete(url);
  },
};

export default accountsApi;
