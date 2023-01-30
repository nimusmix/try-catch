import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import styled from 'styled-components';
import Skeleton from './FeedItemSkeleton';
import { axiosFeedList, axiosFeedSearchList } from '../../utils/api';
import FeedListItem, { IFeedListItemProps } from './FeedListItem';
import FeedCardItem from './FeedCardItem';
import FeedCardSkeleton from './FeedCardSkeleton';
import { MiniTitle, Paragraph } from '../../components';
import { ReactComponent as Bug } from '../../assets/bug.svg';

interface IFeedListProps {
  feedList: Array<IFeedListItemProps>;
}

const ExFeedLIst: IFeedListProps = {
  feedList: [
    {
      feedId: '1',
      title: 'title-1',
      content: 'content-1',
      companyName: 'company-1',
      createdAt: '2023-01-01',
      isBookmarked: false,
      blogURL: 'https://i8e108.p.ssafy.io/',
      thumbnailImage: 'https://i8e108.p.ssafy.io/assets/favicon-1170e8b7.ico',
      tags: ['1'],
    },
    {
      feedId: '2',
      title: 'title-2',
      content: 'content-2',
      companyName: 'company-2',
      createdAt: '2023-01-01',
      isBookmarked: false,
      blogURL: 'https://i8e108.p.ssafy.io/',
      thumbnailImage: 'https://i8e108.p.ssafy.io/assets/favicon-1170e8b7.ico',
      tags: ['2'],
    },
    {
      feedId: '3',
      title: 'title-3',
      content: 'content-3',
      companyName: 'company-3',
      createdAt: '2023-01-01',
      isBookmarked: false,
      blogURL: 'https://i8e108.p.ssafy.io/',
      thumbnailImage: 'https://i8e108.p.ssafy.io/assets/favicon-1170e8b7.ico',
      tags: ['3'],
    },
    {
      feedId: '4',
      title: 'title-4',
      content: 'content-4',
      companyName: 'company-4',
      createdAt: '2023-01-01',
      isBookmarked: false,
      blogURL: 'https://i8e108.p.ssafy.io/',
      thumbnailImage: 'https://i8e108.p.ssafy.io/assets/favicon-1170e8b7.ico',
      tags: ['4'],
    },
    {
      feedId: '5',
      title: 'title-5',
      content: 'content-5',
      companyName: 'company-5',
      createdAt: '2023-01-01',
      isBookmarked: false,
      blogURL: 'https://i8e108.p.ssafy.io/',
      thumbnailImage: 'https://i8e108.p.ssafy.io/assets/favicon-1170e8b7.ico',
      tags: ['5'],
    },
    {
      feedId: '6',
      title: 'title-6',
      content: 'content-6',
      companyName: 'company-6',
      createdAt: '2023-01-01',
      isBookmarked: false,
      blogURL: 'https://i8e108.p.ssafy.io/',
      thumbnailImage: 'https://i8e108.p.ssafy.io/assets/favicon-1170e8b7.ico',
      tags: ['6'],
    },
    {
      feedId: '7',
      title: 'title-7',
      content: 'content-7',
      companyName: 'company-7',
      createdAt: '2023-01-01',
      isBookmarked: false,
      blogURL: 'https://i8e108.p.ssafy.io/',
      thumbnailImage: 'https://i8e108.p.ssafy.io/assets/favicon-1170e8b7.ico',
      tags: ['7'],
    },
    {
      feedId: '8',
      title: 'title-8',
      content: 'content-8',
      companyName: 'company-8',
      createdAt: '2023-01-01',
      isBookmarked: false,
      blogURL: 'https://i8e108.p.ssafy.io/',
      thumbnailImage: 'https://i8e108.p.ssafy.io/assets/favicon-1170e8b7.ico',
      tags: ['8'],
    },
    {
      feedId: '9',
      title: 'title-9',
      content: 'content-9',
      companyName: 'company-9',
      createdAt: '2023-01-01',
      isBookmarked: false,
      blogURL: 'https://i8e108.p.ssafy.io/',
      thumbnailImage: 'https://i8e108.p.ssafy.io/assets/favicon-1170e8b7.ico',
      tags: ['9'],
    },
    {
      feedId: '10',
      title: 'title-10',
      content: 'content-10',
      companyName: 'company-10',
      createdAt: '2023-01-01',
      isBookmarked: false,
      blogURL: 'https://i8e108.p.ssafy.io/',
      thumbnailImage: 'https://i8e108.p.ssafy.io/assets/favicon-1170e8b7.ico',
      tags: ['10'],
    },
  ],
};

const ExCardFedd = {
  feedId: '1',
  title: 'title-1',
  content: 'content-1',
  companyName: '당근마켓',
  // createdAt: '2023-01-01',
  isBookmarked: false,
  blogURL: 'https://i8e108.p.ssafy.io/',
  thumbnailImage: 'https://i8e108.p.ssafy.io/assets/favicon-1170e8b7.ico',
  tags: ['react', 'react-hook-form'],
};

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
   * 원래는 axiosFeedList() 함수 사용
   */

  const { data, isLoading, isError } = useQuery<IFeedListProps, AxiosError>(
    ['feed', keyword],
    () => {
      if (keyword) {
        return axiosFeedSearchList(keyword);
      }
      return axiosFeedList();
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
