import { authApi } from '../../utils/axios-instance';

export const postAnswer = (questionId: string, data: { content: string }) => () => {
  return authApi.post(`/question/${questionId}/answer`, data).then((res) => res.data);
};

export const putAnswer =
  (questionId: number, data: { content: string; answerId: number; hidden: boolean }) => () => {
    return authApi.put(`/question/${questionId}/answer`, data).then((res) => res.data);
  };

export const selectAnswer = (questionId: number, answerId: number) => () => {
  return authApi.post(`/question/${questionId}/${answerId}`).then((res) => res.data);
};
