import {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
/* eslint-disable no-useless-concat */
import { logOnDev } from './logging';

const tokenInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      const axiosConfig = config;
      // const token = getItem('jwt_token')
      const token = JSON.parse(window.sessionStorage.getItem('accToken')!);
      logOnDev.dir(token);
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
