// 로그인
import { api } from '../../utils/axios-instance';

export const getLogin = () => api.get('/auth/login').then((res) => res.data);
