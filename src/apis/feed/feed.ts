import { AxiosResponse } from 'axios';
import { IFeedCompany, IFeedSearch } from '../../interface/feed';
// 피드
import { authApi } from '../../utils/axios-instance';

export const getFeedSearchList = async (params: IFeedSearch) => {
  return authApi.get(`/feed/search`, { params }).then((res) => {
    let nextPage;
    if (res.data.feedList.length === 9) {
      nextPage = params.page + 1;
    }
    return { ...res.data, nextPage };
  });
};

export const postFeedRead = (params: { feedId: number }) =>
  authApi.post('/feed/read', null, { params });

export const getFeedCompany = () =>
  authApi.get('/feed/company').then((res: AxiosResponse<Array<IFeedCompany>>) => res.data);
