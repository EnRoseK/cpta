import axios from 'axios';

const apiUrl = process.env.API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

export { axiosInstance };
