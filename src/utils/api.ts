import axios from 'axios';
import { API_URL } from '../constant';

const api = axios.create({
  baseURL: `https://${API_URL}/v1`,
});

export const axiosFeedList = () => api.get(`/feed/list`).then((res) => res.data);
export const axiosFeedSearchList = (keyword: string) =>
  api.get(`/feed/search?content=${keyword}`).then((res) => res.data);

export const axiosQuestionList = () => api.get('/question').then((res) => res.data);
export const axiosQuestionDetail = (id: number) =>
  api.get(`/question/${id}`).then((res) => res.data);
