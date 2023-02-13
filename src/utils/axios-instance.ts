import axios, { AxiosRequestConfig } from 'axios';
import { useSetRecoilState } from 'recoil';
import { setupInterceptorsTo, tokenInterceptor, TokenRefresher } from './interceptors';
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

  // 토큰 검증
  const accToken = JSON.parse(window.sessionStorage.getItem('accToken')!)?.accToken;
  const TokenCheck = async () => {
    const setIsLoggedIn = useSetRecoilState(isLoggedInState);
    const setAccToken = useSetRecoilState(accToken);
    const setRefToken = useSetRecoilState(refToken);

    const { status } = await axios({
      method: 'get',
      url: `${BASE_URL}/token/expired`,
      headers: {
        Authorization: accToken,
      },
    });

    if (status === 401) {
      const refToken = JSON.parse(window.localStorage.getItem('refToken')!)?.refToken;

      try {
        const { headers } = await axios({
          method: 'get',
          url: '/token/refresh',
          headers: { RefreshToken: refToken },
        });

        const newAccToken = headers.acc;
        setAccToken(newAccToken);
      } catch (err) {
        setIsLoggedIn(false);
        setAccToken('');
        setRefToken('');
        window.location.reload();
      }
    }
  };
  TokenCheck().then(() => tokenInterceptor(instance));
  // 토큰 주입
  // tokenInterceptor(instance);
  // TokenRefresher(instance);
  return setupInterceptorsTo(instance);
};

// 토큰이 필요없는 axios 요청
export const api = axiosApi(BASE_URL);

// 토큰이 필요한 axios 요청
export const authApi = axiosAuthApi(BASE_URL);
