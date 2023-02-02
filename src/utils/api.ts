import axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from '../constant';
import { setupInterceptorsTo, tokenInterceptor } from './intercetors';
import { IFeedSearch } from '../interface/feed';

// 상수
const BASE_URL = `https://${API_URL}/v1`;

// 임시 토큰
const TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnaG9fSzVWWkJOMlZVMlVDem9WUEhqdDRSeVNNVHZuenBvMDE1TkV5IiwiaWQiOiIyIiwiaWF0IjoxNjc1MjMwMzQyLCJleHAiOjE2NzUyNzM1NDJ9.8dSMPWQrkV_1edhNdSjJ6PXRO1RegXEpONQJ4LcesoA';

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
  // 토큰 주입
  tokenInterceptor(instance);
  return setupInterceptorsTo(instance);
};

// 토큰이 필요없는 axios 요청
const api = axiosApi(BASE_URL);

// 토큰이 필요한 axios 요청
const authApi = axiosAuthApi(BASE_URL);

export interface IRoadmap {
  title: string;
  tag: string;
  nodes: string;
  edges: string;
}

// 로그인
// export const getLogin () => api.get('/auth/login').then((res) => )

// Q&A
export const getQuestionList = () => {
  return api.get('/question').then((res) => res.data);
};
export const getQuestionDetail = (id: number) => {
  return api.get(`/question/${id}`).then((res) => res.data);
};

export const postQuestion = (data: any) => {
  return authApi.post<{ title: string }>('/question').then((res) => res.data);
};
// 피드
export const getFeedList = () => {
  return api.get(`/feed/list`).then((res) => res.data);
};
export const getFeedSearchList = async (params: IFeedSearch) => {
  return api.get(`/feed/search`, { params }).then((res) => {
    return { ...res.data, nextPage: params.page + 1 };
  });
};

// 로드맵
export const postRoadmap = (data: IRoadmap) =>
  axios({
    method: 'post',
    url: `${BASE_URL}/roadmap/`,
    headers: {
      Authorization: TOKEN,
    },
    data,
  });
