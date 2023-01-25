import FeedListItem from './FeedListItem';
// import { IFeedListItemProps } from './FeedListItem';
import { ReactComponent as FeedItem } from '../../assets/feed_item.svg';
import { ReactComponent as FeedItems } from '../../assets/feed_items.svg';

const FeedItemList = [
  {
    title: '프레임워크의 선택, React vs Angular',
    desc: '안녕하세요. 카카오엔터프라이즈 워크엔진셀에서 프론트엔드 개발을 담당하고 있는 데니스입니다.  저는 이번에 신규 프로젝트의 FE (Front-end) 개발을 ...',
    company: {
      name: '카카오',
      image: '카카오.png',
    },
    publishedDate: '2021. 6. 2.',
    tags: [
      { id: 1, tagName: 'react' },
      { id: 2, tagName: 'react-hook-form' },
      { id: 3, tagName: 'angular' },
    ],
    isBookmarked: false,
    blogURL: 'https://tech.kakaoenterprise.com/109',
    thumbnailImage: 'https://blog.kakaocdn.net/dn/peKu7/btq5VxLUI39/pDK2WoFnPJDo2MCYujYl01/img.png',
  },
  {
    title: '프레임워크의 선택, React vs Angular',
    desc: '안녕하세요. 카카오엔터프라이즈 워크엔진셀에서 프론트엔드 개발을 담당하고 있는 데니스입니다.  저는 이번에 신규 프로젝트의 FE (Front-end) 개발을 ...',
    company: {
      name: '카카오',
      image: '카카오.png',
    },
    publishedDate: '2021. 6. 2.',
    tags: [
      { id: 1, tagName: 'react' },
      { id: 2, tagName: 'react-hook-form' },
      { id: 3, tagName: 'angular' },
    ],
    isBookmarked: true,
    blogURL: 'https://tech.kakaoenterprise.com/109',
    thumbnailImage: 'https://blog.kakaocdn.net/dn/peKu7/btq5VxLUI39/pDK2WoFnPJDo2MCYujYl01/img.png',
  },
];

const FeedList = () => {
  return (
    <>
      {FeedItemList.map((feedItem, feedIdx) => {
        const feedIndex = feedIdx;
        return <FeedListItem key={feedIndex} {...feedItem} />;
      })}
      {/* <FeedItem /> */}
      {/* <FeedItems /> */}
    </>
  );
};

export default FeedList;
