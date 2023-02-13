import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { useSetRecoilState } from 'recoil';
import { accToken, refToken } from '../recoil/tokenState';
/* eslint-disable no-useless-concat */
import { logOnDev } from './logging';
import isLoggedInState from '../recoil/isLoggedInState';

const tokenInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      const axiosConfig = config;
      const token = JSON.parse(window.sessionStorage.getItem('accToken')!)?.accToken;
      axiosConfig.headers = new AxiosHeaders({
        Authorization: token,
      });
      return axiosConfig;
    },
    (error: AxiosError) => Promise.reject(error.response)
  );
  return instance;
};

const TokenRefresher = (instance: AxiosInstance) => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setAccToken = useSetRecoilState(accToken);
  const setRefToken = useSetRecoilState(refToken);
  instance.interceptors.response.use(
    (response) => response,

    async (error: any) => {
      const {
        config,
        response: { status },
      } = error;

      const originalRequest = config;

      if (status === 401) {
        const refToken = JSON.parse(window.localStorage.getItem('refToken')!)?.refToken;
        const accToken = JSON.parse(window.sessionStorage.getItem('accToken')!)?.accToken;

        try {
          const { headers } = await axios({
            method: 'get',
            url: '/token/refresh',
            headers: { RefreshToken: refToken },
          });
          console.log('헤더 프린트', headers);
          const newAccToken = headers.acc;
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: newAccToken,
          };
          setAccToken(newAccToken);
          return await axios(originalRequest);
        } catch (err) {
          setIsLoggedIn(false);
          setAccToken('');
          setRefToken('');
          window.location.reload();
        }
      }
      return Promise.reject(error);
    }
  );
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

export { tokenInterceptor, setupInterceptorsTo, TokenRefresher };
