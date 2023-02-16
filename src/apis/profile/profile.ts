import { api, authApi } from '../../utils/axios-instance';

// 유저 이름으로 유저 아이디 조회
export const getUserId = (userName: string) =>
  api.get(`/user/id/${userName}`).then((res) => res.data);

// 유저 프로필 디테일 조회
export const getUserDetail = (userId: number) =>
  authApi.get(`/user/detail/${userId}`).then((res) => res.data);

// 작성한 질문 조회
export const getUserQuestion = (userId: number) =>
  authApi.get(`/user/${userId}/question/list`).then((res) => res.data);

// 작성한 답변 조회
export const getUserAnswer = (userId: number) =>
  authApi.get(`/user/${userId}/answer/list`).then((res) => res.data);

// 최근 본 피드 조회
export const getUserRecent = (userId: number) =>
  authApi.get(`/user/${userId}/recent/list`).then((res) => res.data);

// 구독 목록 조회
export const getUserSubscription = (userId: number) =>
  authApi.get(`/user/${userId}/subscription/list`).then((res) => res.data);

// 팔로잉, 팔로워 목록 조회
export const getUserFollow = (userId: number, params: { type: string }) => {
  return authApi.get(`/user/${userId}/list`, { params }).then((res) => res.data);
};

// 획득 뱃지 목록 조회
export const getUserBadge = (userId: number) => {
  return api.get(`/user/${userId}/badge`).then((res) => res.data);
};

// 회원 정보 수정
export const patchUserDetail = (params: { companyName?: string; introduction?: string }) =>
  authApi.patch('/user/detail', params).then((res) => res.data);
