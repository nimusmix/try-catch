import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import styled from 'styled-components';
import Skeleton from './FeedItemSkeleton';
import FeedListItem from './FeedListItem';
import FeedCardItem from './FeedCardItem';
import FeedCardSkeleton from './FeedCardSkeleton';
import { MiniTitle, Paragraph } from '../../components';
import { ReactComponent as Bug } from '../../assets/bug.svg';
import { IFeedListProps } from './IFeed';
import { getFeedList, getFeedSearchList } from '../../apis/feed/feed';

interface IFeedList {
  activeViewOption: boolean;
  keyword: string;
}

const FeedListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 52.875rem;
`;

const FeedList = ({ activeViewOption, keyword }: IFeedList) => {
  /**
   * TODO
   * 임시로 vue search 결과를 feed리스트로 보냄
   * 원래는 getFeedList() 함수 사용
   */

  const { data, isLoading, isError } = useQuery<IFeedListProps, AxiosError>(
    ['feed', keyword],
    () => {
      if (keyword) {
        return getFeedSearchList(keyword);
      }
      return getFeedList();
    }
    // { enabled: !!keyword }
  );

  if (isLoading || data === undefined) {
    if (activeViewOption)
      return (
        <FeedListWrapper>
          <FeedCardSkeleton />
          <FeedCardSkeleton />
          <FeedCardSkeleton />
          <FeedCardSkeleton />
          <FeedCardSkeleton />
          <FeedCardSkeleton />
        </FeedListWrapper>
      );
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

  if (data?.feedList.length === 0) {
    return (
      <FeedListWrapper
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            marginBottom: '1rem',
          }}
        >
          <Bug width="55px" height="70px" />
        </div>
        <MiniTitle sizeType="xl" textAlign="center">
          <strong>{keyword}</strong>에 해당하는 검색 결과가 없습니다
        </MiniTitle>
        <Paragraph sizeType="base" textAlign="center">
          검색어의 철자가 정확한지 확인해 주세요.
          <br />
          비슷한 다른 검색어를 입력해보세요.
        </Paragraph>
      </FeedListWrapper>
    );
  }

  return (
    <FeedListWrapper>
      {data?.feedList.map((feedItem) => {
        if (activeViewOption) return <FeedCardItem key={feedItem.feedId} {...feedItem} />;
        return <FeedListItem key={feedItem.feedId} {...feedItem} />;
      })}
    </FeedListWrapper>
  );
};

export default FeedList;
