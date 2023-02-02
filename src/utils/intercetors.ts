/* eslint-disable no-useless-concat */
import {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { logOnDev } from './logging';

const TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnaG9fSzVWWkJOMlZVMlVDem9WUEhqdDRSeVNNVHZuenBvMDE1TkV5IiwiaWQiOiIyIiwiaWF0IjoxNjc1MjMwMzQyLCJleHAiOjE2NzUyNzM1NDJ9.8dSMPWQrkV_1edhNdSjJ6PXRO1RegXEpONQJ4LcesoA';

const tokenInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      const axiosConfig = config;
      // const token = getItem('jwt_token')
      const token = TOKEN; // 지금은 고정된 토큰 값을 쓰지만 나중엔 다른데서 얻어와야함
      axiosConfig.headers = new AxiosHeaders({
        Authorization: token,
      });
      return axiosConfig;
    },
    (error: AxiosError) => Promise.reject(error.response)
  );
  return instance;
};

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  logOnDev.info(`%c[::request::${config.method}${config.url}------]`, 'color: #229910');
  logOnDev.dir(config);
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  logOnDev.error(`[::request error::${error.config?.method}${error.config?.url}------]`);
  logOnDev.dir(error);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  logOnDev.info(
    `%c [::response::${response.config.method}${response.config.url}------]`,
    'color: #13ce29'
  );
  logOnDev.dir(response);
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  logOnDev.error(`[::response error::${error.config?.method}${error.config?.url}------]`);
  logOnDev.dir(error);
  return Promise.reject(error);
};

const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};

export { tokenInterceptor, setupInterceptorsTo };
