import { api, authApi } from '../../utils/axios-instance';

// 로드맵
export const getUserId = (userName: string) =>
  api.get(`/user/id/${userName}`).then((res) => res.data);

export const getUserDetail = (userId: number) =>
  authApi.get(`/user/detail/${userId}`).then((res) => res.data);

export const getUserQuestion = (userId: number) =>
  authApi.get(`/user/${userId}/question/list`).then((res) => res.data);
