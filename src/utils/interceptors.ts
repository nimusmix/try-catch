import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
/* eslint-disable no-useless-concat */
import { useSetRecoilState } from 'recoil';
import { accToken } from '../recoil/tokenState';
import { logOnDev } from './logging';
import { API_URL } from '../constant';
import { api } from './axios-instance';

const TokenInterceptor = (instance: AxiosInstance) => {
  console.log('1. 토큰 인터셉터 1번째');
  instance.interceptors.request.use(
    (config) => {
      const axiosConfig = config;
      const token = JSON.parse(window.sessionStorage.getItem('accToken')!)?.accToken;
      axiosConfig.headers = new AxiosHeaders({
        Authorization: token,
      });
      console.log('여기는 토큰 인터셉터. 헤더에 토큰 저장함');
      return axiosConfig;
    },
    (error: AxiosError) => Promise.reject(error.response)
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },

    async (error) => {
      console.log('reponse 에러 발생');
      const {
        config,
        response: { status },
      } = error;

      if (status === 401) {
        const originalRequest = config;
        const refToken = JSON.parse(window.localStorage.getItem('refToken')!)?.refToken;
        console.log('리프레시 토큰 출력', refToken);

        // 토큰 refresh 요청
        const data = await axios.get(`https://${API_URL}/token/refresh`, {
          headers: { RefreshToken: refToken },
        });
        console.log('토큰 리프레시 요청해서 받은 데이터', data);
        // 요청 후 새롭게 받은 accToken을 저장
        const {
          data: { acc: newAccToken },
        } = data;

        originalRequest.headers.Authorization = newAccToken;
        return api(originalRequest);
      }
      return Promise.reject(error);
    }
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

export { TokenInterceptor, setupInterceptorsTo };
