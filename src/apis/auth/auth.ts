// 로그인
import { api, authApi } from '../../utils/axios-instance';

export const getLogin = () => api.get('/auth/login').then((res) => res.data);

export const getName = () => authApi.get('/user/name').then((res) => res.data);

export const getImage = (token: string) => {
  const userId = JSON.parse(token);
  return api.get(`/user/image/${userId}`).then((res) => res.data);
};
