import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import styled from 'styled-components';
import Skeleton from './FeedItemSkeleton';
import { getFeedSearchList } from '../../utils/api';
import { IFeedSearch } from '../../interface/feed';
import FeedListItem from './FeedListItem';
import FeedCardItem from './FeedCardItem';
import FeedCardSkeleton from './FeedCardSkeleton';
import { MiniTitle, Paragraph } from '../../components';
import { ReactComponent as Bug } from '../../assets/bug.svg';
import { IFeedListProps } from './IFeed';

interface IFeedList {
  activeViewOption: boolean;
  keyword: string;
  // query: string;
  subscribe: boolean;
  advanced: boolean;
  tagListProps: Array<string>;
  getData: (data: Array<string>) => void;
  activeFilterOption: string;
}

const FeedListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 52.875rem;
`;

const NonSearchResult = ({ keyword }: Partial<IFeedList>) => {
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
};

const FeedList = ({
  activeViewOption,
  keyword,
  // query,
  subscribe,
  advanced,
  tagListProps,
  getData,
  activeFilterOption,
}: IFeedList) => {
  /**
   * TODO
   * getFeedSearch()로 변경해야함
   */

  // const [tagList, setTagList] = useRecoilState(tagListState);

  const paramSort = activeFilterOption === '최신순' ? 'date' : 'user';

  const { data, isLoading, isError } = useQuery<IFeedListProps, AxiosError>(
    ['feed', keyword, paramSort],
    () => {
      const params: IFeedSearch = {
        query: keyword,
        sort: paramSort,
        subscribe,
        advanced,
        publishDateStart: null,
        publishDateEnd: null,
        page: 0,
        size: 10,
      };
      return getFeedSearchList(params);
    }
  );

  let newTagList: Array<string> = [];
  let tagListLen = 10;
  let checkChange = false;

  if (!isLoading && data?.feedList && data?.feedList.length !== 0) {
    tagListLen = data?.feedList.length > 10 ? 10 : data?.feedList.length;
    const tagListSet = new Set<string>();

    for (let i = 0; i < tagListLen; i += 1) {
      data?.feedList[i].keywords.forEach((element: string) => {
        tagListSet.add(element);
      });
    }
    newTagList = [...tagListSet];
    const newTagListSlice = newTagList.slice(0, tagListLen + 1);

    checkChange =
      newTagListSlice.every((item) => tagListProps.includes(item)) &&
      tagListProps.every((item) => newTagListSlice.includes(item));

    if (!checkChange) {
      getData(newTagListSlice);
    }
  }

  /** TODO  최상위 10개 데이터에 대한 키워드 15개 뽑기
   * 추후 keyword 개수 많은 순으로 count 해서 보내주기
   */

  // data?.feedList.slice(tagListLen + 1).forEach((item) => {
  //   item.keywords.forEach((element) => {
  //     tagListSet.add(element);
  //   });
  // });

  return (
    <div>
      {isLoading && activeViewOption && (
        <FeedListWrapper>
          <FeedCardSkeleton />
          <FeedCardSkeleton />
          <FeedCardSkeleton />
          <FeedCardSkeleton />
          <FeedCardSkeleton />
          <FeedCardSkeleton />
        </FeedListWrapper>
      )}
      {isLoading && !activeViewOption && (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      )}
      {isError && <h2>에러입니다.</h2>}
      {data?.feedList.length === 0 && <NonSearchResult keyword={keyword} />}
      <FeedListWrapper>
        {data?.feedList.map((feedItem) => {
          if (activeViewOption) return <FeedCardItem key={feedItem.feedId} {...feedItem} />;
          return <FeedListItem key={feedItem.feedId} {...feedItem} />;
        })}
      </FeedListWrapper>
    </div>
  );
};

export default FeedList;
