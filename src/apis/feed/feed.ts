// 피드
import { api } from '../../utils/axios-instance';

export const getFeedList = () => {
  return api.get(`/feed/list`).then((res) => res.data);
};
export const getFeedSearchList = (keyword: string) =>
  api.get(`/feed/search?content=${keyword}`).then((res) => res.data);
