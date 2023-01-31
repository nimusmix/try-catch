import axios from 'axios';

const api = axios.create({
  baseURL: 'https://beta.api.try-catch.duckdns.org/v1',
});

export const axiosFeedList = () => api.get(`/feed/list`).then((res) => res.data);
export const axiosFeedSearchList = (keyword: string) =>
  api.get(`/feed/search?content=${keyword}`).then((res) => res.data);

export const axiosQuestionList = () => api.get('/question').then((res) => res.data);
