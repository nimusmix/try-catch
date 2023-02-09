export interface IFeedItemProps {
  feedId: string | number; // 피드 고유 아이디
  title: string; // 피드 제목
  summary: string; // 피드 요약 ( 300자 내외 )
  companyName: string; // 회사 이름
  logoSrc: string; // 로고 이미지 경로
  createAt: string; // 피드 생성일 yyyy-MM-dd
  url: string; // 피드 URL
  thumbnailImage: string; // 썸네일 이미지 URL
  tags: Array<string>; // 크롤링 시 수집한 태그
  keywords: Array<string>; // 인공지능 모델을 통해 추출한 태그
  isBookmarked: boolean; // 북마크 여부
  checkedItemsProps: Array<number>;
}

export interface IFeedListProps {
  feedList: Array<IFeedItemProps>;
  nextPage: string | undefined;
}
