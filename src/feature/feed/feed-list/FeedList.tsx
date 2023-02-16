import { useInfiniteQuery } from 'react-query';
import { AxiosError } from 'axios';
import styled from 'styled-components';
import { useEffect } from 'react';

import { IFeedList, IFeedListProps, IFeedSearch } from '../../../interface/feed';
import FeedListItem from './FeedListItem';
import FeedCardItem from './FeedCardItem';

import { getFeedSearchList } from '../../../apis/feed/feed';

import FeedCardSkeletonList from '../skeleton/FeedCardSkeletonList';
import FeedItemSkeletonList from '../skeleton/FeedItemSkeletonList';
import FeedNoContent from '../feed-search/FeedNoContent';
import { media } from '../../../utils/media';

const FeedListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 52.875rem;
  ${media.phone`
    min-width: unset;
    width: 100%;
  `}
`;

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

  return (
    <div>
      {/* 첫 페이지 로딩 카드 아이템 스켈레톤 */}
      {isLoading && activeViewOption && <FeedCardSkeletonList />}
      {/* 첫 페이지 로딩 리스트 아이템 스켈레톤 */}
      {isLoading && !activeViewOption && <FeedItemSkeletonList />}
      {isError && <h2>에러입니다.</h2>}
      {/* 구독 리스트 없을 때 */}
      {subscribe && data?.pages[0].feedList.length === 0 && (
        <FeedNoContent keyword={keyword} subscribe={subscribe} />
      )}
      {/* 검색 결과가 없을 때 */}
      {!subscribe && data?.pages[0].feedList.length === 0 && (
        <FeedNoContent keyword={keyword} subscribe={subscribe} />
      )}
      {/* 검색 결과가 있을 때 */}
      <FeedListWrapper>
        {data?.pages.map((page, index) => {
          const pageIdx = `${page} ${index}`;
          return page.feedList.map((feedItem) => {
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
                keyword={keyword}
                paramSort={paramSort}
                subscribe={subscribe}
                advanced={advanced}
                checkedItemsProps={checkedItemsProps}
              />
            );
          });
        })}
      </FeedListWrapper>
    </div>
  );
};

export default FeedList;
