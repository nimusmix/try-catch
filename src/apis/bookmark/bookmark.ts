// 북마크
import { AxiosResponse } from 'axios';
import { IBookmarkQuestion } from '../../interface/bookmark';
import { authApi } from '../../utils/axios-instance';

export const getBookmarkQuestionList = () =>
  authApi.get(`/bookmark/question`).then((res: AxiosResponse<IBookmarkQuestion>) => res.data);

// export const postBookmarkQuestion = () => authApi.post();
// export const putBookmarkQuestion = () => authApi.put();

export const getBookmarkFeedList = () => authApi.get(`/bookmark/feed`).then((res) => res.data);
