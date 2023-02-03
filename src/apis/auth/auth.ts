// 로그인
import { api, authApi } from '../../utils/axios-instance';
import tokenDecode from '../../utils/tokenDecode';

export const getLogin = () => api.get('/auth/login').then((res) => res.data);

export const getName = () => authApi.get('/user/name').then((res) => res.data);

export const getImage = (token: string) => {
  const userId = tokenDecode(token, 'id');
  return api.get(`/user/image/${userId}`).then((res) => res.data);
};
