import { authApi } from '../../utils/axios-instance';

export const postAnswer = (questionId: string, data: { content: string }) => () => {
  return authApi.post(`/question/${questionId}/answer`, data).then((res) => res.data);
};
