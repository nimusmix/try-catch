// Q&A
import { AxiosResponse } from 'axios';
import { api, authApi } from '../../utils/axios-instance';
import { IPostQuestion, IQuestion, IQuestionSearch } from '../../interface/qna';

export const getQuestionList = (params: IQuestionSearch) => {
  return api.get(`/question`, { params }).then((res: AxiosResponse<Array<IQuestion>>) => {
    let nextPage;
    if (res.data.length === 10) {
      nextPage = params.page + 1;
    }
    return { data: res.data, nextPage };
  });
};

export const getQuestQuestionList = () => {
  return api.get('/question/quest').then((res: AxiosResponse<Array<IQuestion>>) => res.data);
};
export const getQuestionDetail = (id: string) => () => {
  return authApi.get(`/question/${id}`).then((res: AxiosResponse<IQuestion>) => {
    return res.data;
  });
};

export const postQuestion = (data: IPostQuestion) => () => {
  return authApi.post('/question', data).then((res: AxiosResponse) => res.data);
};
