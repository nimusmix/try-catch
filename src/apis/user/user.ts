import { api, authApi } from '../../utils/axios-instance';

export const postFollow = (userId: number) => authApi.post(`/user/follow/${userId}`);

export const putFollow = (userId: number) => authApi.put(`/user/follow/${userId}`);
