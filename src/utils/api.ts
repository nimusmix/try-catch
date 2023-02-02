import axios from 'axios';
import { API_URL } from '../constant';

const BASE_URL = `https://${API_URL}/v1`;

const api = axios.create({
  baseURL: `https://${API_URL}/v1`,
});

// 임시 토큰
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnaG9fTVBwbXpkeXhobFEzcHJKYjdpRHR4YVJ4OHpHM2l3M0VJSEIyIiwiaWQiOiIyIiwiaWF0IjoxNjc1MzAyNDIzLCJleHAiOjE2NzUzNDU2MjN9.psq773s_cftHNmSvLZYtZV7aU4wAd3bqEk5p9XRg28g';

// axios({
//   method: 'get',
//   url: BASE_URL + '/question',
//   headers: {
//     Authorization: token,
//   }
// })

export interface IRoadmap {
  title: string;
  tag: string;
  nodes: string;
  edges: string;
}

// 로그인
// export const getLogin () => api.get('/auth/login').then((res) => )

// Q&A
export const getQuestionList = () => api.get('/question').then((res) => res.data);
export const getQuestionDetail = (id: number) => api.get(`/question/${id}`).then((res) => res.data);

// 피드
export const getFeedList = () => api.get(`/feed/list`).then((res) => res.data);
export const getFeedSearchList = (keyword: string) =>
  api.get(`/feed/search?content=${keyword}`).then((res) => res.data);

// 로드맵
export const postRoadmap = (data: IRoadmap) =>
  axios({
    method: 'post',
    url: `${BASE_URL}/roadmap/`,
    headers: {
      Authorization: token,
    },
    data,
  });
