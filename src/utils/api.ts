import axios from 'axios';
import { tokenize } from 'prismjs';
import { API_URL } from '../constant';

const BASE_URL = `https://${API_URL}/v1`;

const api = axios.create({
  baseURL: `https://${API_URL}/v1`,
});

// 임시 토큰
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnaG9fSzVWWkJOMlZVMlVDem9WUEhqdDRSeVNNVHZuenBvMDE1TkV5IiwiaWQiOiIyIiwiaWF0IjoxNjc1MjMwMzQyLCJleHAiOjE2NzUyNzM1NDJ9.8dSMPWQrkV_1edhNdSjJ6PXRO1RegXEpONQJ4LcesoA';

// axios({
//   method: 'get',
//   url: BASE_URL + '/question',
//   headers: {
//     Authorization: token,
//   }
// })

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
export const postRoadmap = () =>
  axios({
    method: 'post',
    url: `${BASE_URL}/roadmap/`,
    headers: {
      Authorization: token,
    },
  }).then((res) => res.data);
