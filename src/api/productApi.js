import axiosClient from './axiosClient';

const productApi = {
  async getAll(params) {
    console.log(params);
    const productList = await axiosClient.get('/product', { params: params });

    return {
      data: productList,
      pagination: { page: productList.page, totalPage: productList.totalPage },
    };
  },

  get(id) {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },
};

export default productApi;
