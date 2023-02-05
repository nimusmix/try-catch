// Q&A
import { AxiosResponse } from 'axios';
import { api, authApi } from '../../utils/axios-instance';
import { IPostQuestion, IQuestion } from '../../interface/qna';

export const getQuestionList = (activeCategory: 'DEV' | 'CAREER' | 'BALANCE') => {
  return api
    .get(`/question?category=${activeCategory}`)
    .then((res: AxiosResponse<Array<IQuestion>>) => res.data);
};

export const getQuestQuestionList = () => {
  return api.get('/question/quest').then((res: AxiosResponse<Array<IQuestion>>) => res.data);
};
export const getQuestionDetail = (id: string) => () => {
  return api.get(`/question/${id}`).then((res: AxiosResponse<IQuestion>) => res.data);
};

export const postQuestion = (data: IPostQuestion) => () => {
  return authApi.post('/question', data).then((res: AxiosResponse) => res.data);
};
