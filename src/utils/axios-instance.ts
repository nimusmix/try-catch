import axios, { AxiosRequestConfig } from 'axios';
import { setupInterceptorsTo, tokenInterceptor } from './interceptors';
import { API_URL } from '../constant';

const BASE_URL = `https://${API_URL}/v1`;
const IMAGE_SERVER_URL = `https://image.try-catch.kr/v1/images/bucket`;

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
  tokenInterceptor(instance);
  return setupInterceptorsTo(instance);
};

// 토큰이 필요없는 axios 요청
export const api = axiosApi(BASE_URL);

// 토큰이 필요한 axios 요청
export const authApi = axiosAuthApi(BASE_URL);
export const imageApi = axiosApi(IMAGE_SERVER_URL);
