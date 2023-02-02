// Q&A
import { api, authApi } from '../../utils/axios-instance';

export const getQuestionList = () => {
  return api.get('/question').then((res) => res.data);
};
export const getQuestionDetail = (id: number) => {
  return api.get(`/question/${id}`).then((res) => res.data);
};

// TODO : data 타입 지정
export const postQuestion = (data: any) => () => {
  // eslint-disable-next-line no-param-reassign
  return authApi.post('/question', data).then((res) => res.data);
};
