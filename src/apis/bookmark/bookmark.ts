// 북마크
import { AxiosResponse } from 'axios';
import { IBookmarkQuestion, IBookmarkBody } from '../../interface/bookmark';
import { authApi } from '../../utils/axios-instance';

export const getBookmarkQuestionList = () =>
  authApi
    .get(`/bookmark/question`)
    .then((res: AxiosResponse<Array<IBookmarkQuestion>>) => res.data);

// export const postBookmarkQuestion = (data: IBookmarkBody) => authApi.post(`/bookmark`, data);
export const putBookmark = (data: IBookmarkBody) => authApi.put(`/bookmark`, data);

export const getBookmarkFeedList = () => authApi.get(`/bookmark/feed`).then((res) => res.data);
