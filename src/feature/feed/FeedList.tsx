import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import Skeleton from './FeedItemSkeleton';
import { axiosFeedSearchList } from '../../utils/api';
import FeedListItem, { IFeedListItemProps } from './FeedListItem';

interface IFeedListProps {
  feedList: IFeedListItemProps[];
}

const FeedList = () => {
  /**
   * TODO
   * 임시로 vue search 결과를 feed리스트로 보냄
   * 원래는 axiosFeedList() 함수 사용
   */
  const { data, isLoading, isError } = useQuery<IFeedListProps, AxiosError>('feed', () =>
    axiosFeedSearchList('vue')
  );

  if (isLoading || data === undefined) {
    return (
      <>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </>
    );
  }
  if (isError) {
    return <h4>Something went wrong !!</h4>;
  }

  return (
    <div>
      {data?.feedList.map((feedItem) => {
        return <FeedListItem key={feedItem.feedId} {...feedItem} />;
      })}
    </div>
  );
};

export default FeedList;
