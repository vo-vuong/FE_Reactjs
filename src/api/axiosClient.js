import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8081/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // log xem thu cai error nhu nao truoc da
    // console.log('Error response: ', error.response);
    const { config, status, data } = error.response;
    if (config.url === '/register' && status === 400) {
      const errorMessage = data || [];
      // console.log(data);
      // console.log(errorMessage.message);
      throw new Error(errorMessage.message); // Cai throw ni la neu vo day thi show cai error nay khong phai cai error duoi return.
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
