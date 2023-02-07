// Q&A
import { AxiosResponse } from 'axios';
import { api, authApi } from '../../utils/axios-instance';
import { IPostQuestion, IQuestion, IQuestionSearch } from '../../interface/qna';

// Question 목록을 불러온다
export const getQuestionList = (params: IQuestionSearch) => {
  return api.get(`/question`, { params }).then((res: AxiosResponse<Array<IQuestion>>) => {
    let nextPage;
    if (res.data.length === 10) {
      nextPage = params.page + 1;
    }
    return { data: res.data, nextPage };
  });
};

/**
 * @param id 질문ID(number)
 * id에 해당하는 질문 상세내용을 불러온다
 */
export const getQuestionDetail = (id: number) => () => {
  return authApi.get(`/question/${id}`).then((res: AxiosResponse<IQuestion>) => {
    return res.data;
  });
};

/**
 * @param id 질문ID(number)
 * id에 해당하는 질문을 삭제한다
 */
export const deleteQuestion = (id: number) => () => {
  return authApi.delete(`/question/${id}`).then((res: AxiosResponse) => res.data);
};

/**
 * @param data {
 *   category: 'DEV' | 'CAREER' | 'BALANCE';
 *   title: string;
 *   content: string;
 *   errorCode: string;
 *   tags: Array<string>;
 *   }
 * 질문 작성
 */
export const postQuestion = (data: IPostQuestion) => () => {
  return authApi.post('/question', data).then((res: AxiosResponse) => res.data);
};

/**
 * @param data {
 *   category: 'DEV' | 'CAREER' | 'BALANCE';
 *   title: string;
 *   content: string;
 *   errorCode: string;
 *   tags: Array<string>;
 *   }
 * @param id : 질문ID(number)
 * 질문 수정
 */
export const putQuestion = (id: number, data: IPostQuestion) => () => {
  return authApi.post(`/question/${id}`, data).then((res: AxiosResponse) => res.data);
};

export const getQuestQuestionList = () => {
  return api.get('/question/quest').then((res: AxiosResponse<Array<IQuestion>>) => res.data);
};
