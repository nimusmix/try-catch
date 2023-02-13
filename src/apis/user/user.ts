import { authApi } from '../../utils/axios-instance';

export const postFollow = (userId: number) => authApi.post(`/user/follow/${userId}`);

export const putFollow = (userId: number) => authApi.put(`/user/follow/${userId}`);

// 기업 구독 (성공 시 200, 실패시 406)
export const postSubscribe = (companyId: number) => authApi.post(`/user/subscribe/${companyId}`);

export const puttSubscribe = (companyId: number) => authApi.put(`/user/subscribe/${companyId}`);
