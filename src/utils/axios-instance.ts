import axios, { AxiosRequestConfig } from 'axios';
import { useSetRecoilState } from 'recoil';
import { setupInterceptorsTo, TokenInterceptor } from './interceptors';
import { API_URL } from '../constant';
import isLoggedInState from '../recoil/isLoggedInState';
import { refToken } from '../recoil/tokenState';

const BASE_URL = `https://${API_URL}/v1`;

// 토큰이 필요없는 axios
const axiosApi = (url: string, options: AxiosRequestConfig = {}) => {
  const instance = axios.create({ baseURL: url, ...options });
  return setupInterceptorsTo(instance);
};

// 토큰이 필요한 axios
const axiosAuthApi = (url: string, options: AxiosRequestConfig = {}) => {
  const instance = axios.create({
    baseURL: url,
    ...options,
  });

  // 토큰 주입
  TokenInterceptor(instance);
  return setupInterceptorsTo(instance);
};

// 토큰이 필요없는 axios 요청
export const api = axiosApi(BASE_URL);

// 토큰이 필요한 axios 요청
export const authApi = axiosAuthApi(BASE_URL);
