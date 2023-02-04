// 피드
import { api } from '../../utils/axios-instance';
import { IFeedSearch } from '../../interface/feed';

export const getFeedList = () => {
  return api.get(`/feed/list`).then((res) => res.data);
};
export const getFeedSearchList = async (params: IFeedSearch) => {
  return api.get(`/feed/search`, { params }).then((res) => {
    let nextPage;
    if (res.data.feedList.length === 9) {
      nextPage = params.page + 1;
    }
    return { ...res.data, nextPage };
  });
};
