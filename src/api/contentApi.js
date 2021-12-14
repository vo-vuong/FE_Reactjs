import axiosAdmin from './axiosAdmin';
import axiosClient from './axiosClient';

const contentApi = {
  async getAll(params) {
    // console.log(params.filters);
    const contentList = await axiosClient.get('/new', { params: params.filters });
    // console.log(productList.list);
    return {
      data: contentList.list,
      pagination: { page: productList.page, totalPage: productList.totalPage },
    };
  },

  getAllAdmin(params) {
    const url = '/admin/new';
    return axiosAdmin.get(url, { params });
  },

  get(id) {
    const url = `/new/${id}`;
    return axiosClient.get(url);
  },

  addAdmin(data) {
    const url = '/new';
    return axiosAdmin.post(url, data);
  },

  remove(id) {
    const url = `/new/${id}`;
    return axiosAdmin.delete(url);
  },
};

export default contentApi;
