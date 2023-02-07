// 북마크
import { AxiosResponse } from 'axios';
import { IBookmarkQuestion, IBookmarkRoadMap, IBookmarkBody } from '../../interface/bookmark';
import { authApi } from '../../utils/axios-instance';

export const getBookmarkQuestionList = () =>
  authApi
    .get(`/bookmark/question`)
    .then((res: AxiosResponse<Array<IBookmarkQuestion>>) => res.data);

export const getBookmarkRoadmapList = () =>
  authApi.get(`/bookmark/roadmap`).then((res: AxiosResponse<Array<IBookmarkRoadMap>>) => res.data);

export const postBookmark = (data: IBookmarkBody) => authApi.post(`/bookmark`, data);
export const putBookmark = (data: IBookmarkBody) => authApi.put(`/bookmark`, data);
