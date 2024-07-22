import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4444'
})

instance.interceptors.request.use(function (config) {
    const { token } = JSON.parse(window.localStorage.getItem('user'))
    config.headers.Authorization = token
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

export default instance