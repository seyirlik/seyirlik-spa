import axios from 'axios';

// api url
import { API_URL } from './constants';

const http = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// add token before request is sent
http.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token'); //get token
  config.headers.Authorization = token ? `Bearer ${token}` : ''; // add token to request headers
  return config;
});
// response split get received api data
http.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default http;
