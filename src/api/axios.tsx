import { useNavigate } from 'react-router-dom';
import { signal } from '@preact/signals-react';
import axios from 'axios';

import { refreshToken } from './Auth';

const API_URL = process.env.REACT_APP_API_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export const axiosPrivate = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const accessToken = signal('');

axiosPrivate.interceptors.request.use(
  config => {
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

axiosPrivate.interceptors.response.use(
  response => response,
  async error => {
    const prevRequest = error?.config;

    if (error?.response?.status === 401 || !prevRequest.sent) {
      prevRequest.sent = true;
      try {
        const newAccessTokenResponse = await refreshToken();

        if (newAccessTokenResponse?.status == 200) {
          accessToken.value = newAccessTokenResponse?.data?.access;
          prevRequest.headers['Authorization'] =
            `Bearer ${newAccessTokenResponse?.data?.access}`;
          return axiosPrivate(prevRequest);
        } else {
          const navigate = useNavigate();

          navigate('/signin', { replace: true });
        }
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
    return error.response;
  },
);

export default axiosPrivate;
