import { useInfiniteQuery } from 'react-query';
import { AxiosError } from 'axios';
import styled from 'styled-components';
import { useEffect } from 'react';

import { IFeedSearch } from '../../interface/feed';
import FeedListItem from './FeedListItem';
import FeedCardItem from './FeedCardItem';

import { MiniTitle, Paragraph } from '../../components';
import { ReactComponent as Bug } from '../../assets/bug.svg';
import { IFeedListProps } from './IFeed';
import { getFeedSearchList } from '../../apis/feed/feed';

import FeedCardSkeletonList from './skeleton/FeedCardSkeletonList';
import FeedItemSkeletonList from './skeleton/FeedItemSkeletonList';

interface IFeedList {
  activeViewOption: boolean;
  keyword: string;
  // query: string;
  subscribe: boolean;
  advanced: boolean;
  tagListProps: Array<string>;
  getData: (data: Array<string>) => void;
  activeFilterOption: string;
  checkedItemsProps: Array<number>;
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
  checkedItemsProps,
}: IFeedList) => {
  /**
   * TODO
   * getFeedSearch()로 변경해야함
   */

  const paramSort = activeFilterOption === '최신순' ? 'date' : 'user';

  const { status, data, isLoading, isError, isFetchingNextPage, fetchNextPage } = useInfiniteQuery<
    IFeedListProps,
    AxiosError
  >(
    ['feed', keyword, paramSort, subscribe, advanced],
    async ({ pageParam = 0 }) => {
      const params: IFeedSearch = {
        query: keyword,
        sort: paramSort,
        subscribe,
        advanced,
        publishDateStart: null,
        publishDateEnd: null,
        page: pageParam,
        size: 9,
      };

      return getFeedSearchList(params);
    },
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    }
  );

  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 500) {
        fetchNextPage();
      }
    };
    if (!isFetchingNextPage) window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (!isLoading && data?.pages && data?.pages[0].feedList.length !== 0) {
      const tagListLen = data?.pages[0].feedList.length > 10 ? 10 : data?.pages[0].feedList.length;
      const tagListSet = new Set<string>();

      for (let i = 0; i < tagListLen; i += 1) {
        const keywords = data?.pages[0].feedList[i].keywords;
        if (keywords) {
          keywords.forEach((element: string) => {
            tagListSet.add(element);
          });
        }
        const tags = data?.pages[0].feedList[i].tags;
        if (tags) {
          tags.forEach((element: string) => {
            tagListSet.add(element);
          });
        }
      }
      const newTagList = [...tagListSet];
      const newTagListSlice = newTagList.slice(0, tagListLen + 1);

      const checkChange =
        newTagListSlice.every((item) => tagListProps.includes(item)) &&
        tagListProps.every((item) => newTagListSlice.includes(item));

      if (!checkChange) {
        getData(newTagListSlice);
      }
    }
  }, [getData, isLoading, data?.pages, tagListProps]);

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
      {/* 첫 페이지 로딩 카드 아이템 스켈레톤 */}
      {isLoading && activeViewOption && <FeedCardSkeletonList />}
      {/* 첫 페이지 로딩 리스트 아이템 스켈레톤 */}
      {isLoading && !activeViewOption && <FeedItemSkeletonList />}
      {isError && <h2>에러입니다.</h2>}
      {/* 검색 결과가 없을 때 */}
      {data?.pages[0].feedList.length === 0 && <NonSearchResult keyword={keyword} />}
      {/* 검색 결과가 있을 때 */}
      {data?.pages.map((page, index) => {
        const pageIdx = `${page} ${index}`;
        return (
          <FeedListWrapper key={pageIdx}>
            {page.feedList.map((feedItem) => {
              if (activeViewOption)
                return (
                  <FeedCardItem
                    key={feedItem.feedId}
                    {...feedItem}
                    checkedItemsProps={checkedItemsProps}
                  />
                );
              return (
                <FeedListItem
                  key={feedItem.feedId}
                  {...feedItem}
                  checkedItemsProps={checkedItemsProps}
                />
              );
            })}
          </FeedListWrapper>
        );
      })}
    </div>
  );
};

export default FeedList;
