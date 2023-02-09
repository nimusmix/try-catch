// 피드
import { api, authApi } from '../../utils/axios-instance';
import { IFeedSearch } from '../../interface/feed';

export const getFeedSearchList = async (params: IFeedSearch) => {
  return api.get(`/feed/search`, { params }).then((res) => {
    let nextPage;
    if (res.data.feedList.length === 9) {
      nextPage = params.page + 1;
    }
    return { ...res.data, nextPage };
  });
};

export const postFeedRead = (params: { feedId: number }) =>
  authApi.post('/feed/read', { params }).then((res) => res.data);
