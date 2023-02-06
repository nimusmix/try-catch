import { ILikeBody } from '../../interface/like';
import { authApi } from '../../utils/axios-instance';

export const postLike = (data: ILikeBody) => authApi.post(`/like`, data);

export const cancelLike = (data: ILikeBody) => authApi.put(`/like`, data);
