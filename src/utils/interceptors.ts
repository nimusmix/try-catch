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
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnaG9fOVJjeTc1TUFoTEppQXhEUW8xRzFEWjVFdVlsMHhlM2xYcHpHIiwiaWQiOiIxNCIsImlhdCI6MTY3NTMxODA0MiwiZXhwIjoxNjc1MzYxMjQyfQ.FxHi_4zP6DUh3nb21X6mDog72cWGMfz8h586TMtBb1U';

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
  logOnDev.info(
    `🙏 %c[API] ${config.method?.toUpperCase()} ${config.url} | [::request::]`,
    'color: #229910'
  );
  logOnDev.dir(config);
  logOnDev.log('', '');
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  logOnDev.error(
    `💥 [API] ${error.config?.method?.toUpperCase()} ${error.config?.url} | [::request error::]`
  );
  logOnDev.dir(error);
  logOnDev.log('', '');
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  logOnDev.info(
    `👌 %c [API] ${response.config.method?.toUpperCase()} ${response.config.url} | [::response::] ${
      response.status
    }`,
    'color: #13ce29'
  );
  logOnDev.dir(response);
  logOnDev.log('', '');
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  logOnDev.error(
    `💥 [API] ${error.config?.method?.toUpperCase()} ${error.config?.url} | [::response error::]`
  );
  logOnDev.dir(error);
  logOnDev.log('', '');
  return Promise.reject(error);
};

const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};

export { tokenInterceptor, setupInterceptorsTo };
