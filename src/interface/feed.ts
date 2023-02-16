interface IFeedItemV1 {
  feedId: string; // 피드 고유 아이디
  title: string; // 피드 제목
  summary: string; // 피드 요약 ( 300자 내외 )
  companyName: string; // 회사 이름
  createdAt: string; // 피드 생성일 yyyy-MM-dd
  url: string; // 피드 URL
  thumbnailImage: string; // 썸네일 이미지 URL
  tags: Array<string>; // 크롤링 시 수집한 태그
  keywords: Array<string>; // 인공지능 모델을 통해 추출한 태그
  isBookmarked: boolean; // 북마크 여부
}

/**
 * Request get: 피드 검색 요청
 * {API_URL}/feed/search?
 *
 * [] 안의 값이 디폴트
 *
 * 본문, 제목 검색
 * query = [None] | $text
 *
 * 정렬
 * sort = [date] | user
 *
 * 구독 필터
 * subscribe = [false] | true
 *
 * 검색 타입
 * type= [None] | advance
 *
 * 날짜 필터
 * publishDateStart= [None] | 'yyyy-MM-dd' // None: -무한대
 * publishDateEnd= [None] | 'yyyy-MM-dd' // None: 현재
 *
 * 페이지 번호
 * page= [0] : $number
 *
 * 페이지당 불러올 개수
 * size= [0] : $number
 */

export interface IFeedSearch {
  query: string | null;
  sort: 'date' | 'user';
  subscribe: boolean;
  advanced: boolean;
  publishDateStart: string | null; // 'yyyy-MM-dd';
  publishDateEnd: string | null; // 'yyyy-MM-dd';
  page: number; // 0부터 시작 (default: 0)
  size: number; // 페이지당 개수
}

/**
 * Response: 피드 관련 응답
 * {API_URL}/feed/search?
 * 응답: IFeedList
 */
export interface IFeedItem {
  feedId: string; // 피드 고유 아이디
  title: string; // 피드 제목
  summary: string; // 피드 요약 ( 300자 내외 )
  companyName: string; // 회사 이름
  logoSrc: string; // 회사 로고 이미지 링크 (현재 로고 이름)
  createdAt: string; // 피드 생성일 yyyy-MM-dd
  url: string; // 피드 URL
  thumbnailImage: string; // 썸네일 이미지 URL
  tags: Array<string>; // 크롤링 시 수집한 태그
  keywords: Array<string>; // 인공지능 모델을 통해 추출한 태그
  isBookmarked: boolean; // 북마크 여부
}

interface IFeedListResponse {
  feedList: Array<IFeedItem>;
}

/**
 * Request get: Company 추천
 * {API_URL}/feed/company
 *
 * [] 안의 값이 디폴트
 *
 * 정렬: 관심순, 조회순
 * sort = [viewCount] | recommend
 *
 * 불러올 개수
 * size= [0] | $number
 */
interface IFeedCompanyRequest {
  sort: 'viewCount' | 'recommend';
  size: number; // 불러올 개수
}

/**
 * Response: Company 추천
 * {API_URL}/feed/company
 *
 * 응답:
 * Array<IFeedCompany>
 */
export interface IFeedCompany {
  companyId: number; // 회사 아이디 (회사 프로필페이지 이동 위함)
  logoSrc: string; // 회사 로고 이미지 경로
  companyName: string; // 회사 이름 표기
  isFollowed: boolean; // 구독 여부 (비 로그인시: 모두 false)
}

/**
 * Request post: 피드 Item 북마크
 * Request put: 피드 Item 북마크 취소
 * {API_URL}/bookmark
 *
 * 헤더 JWT
 *
 * body{
 *    id: number, // '질문아이디' 나 '피드 아이디'
 *    type: string; // 질문: 'question', 피드: 'feed'
 * }
 */

interface IBookmark {
  id: string;
  type: string;
}

/**
 * Request post: Company 구독
 * Request put: Company 구독 취소
 *
 * {API_URL}/subscribe
 *
 * 헤더 JWT
 *
 * body{
 *    companyId : number; // 회사 고유 아이디
 * }
 */
interface ICompanySubscribe {
  companyId: number; // 회사 고유 아이디
}

/** API 와는 연관 없는 Feed interface */

export interface IFeedList {
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

export interface IFeedItemProps {
  id: number; // 북마크 및 최근 본 피드용 id
  feedId: string | number; // 피드 고유 아이디 (수민: 기업 프로필 feedId number로 와서 number 추가했어요..!)
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

  // 북마크 낙관적 update시 props
  keyword: string;
  paramSort: 'date' | 'user';
  subscribe: boolean;
  advanced: boolean;
}

export interface IFeedListProps {
  feedList: Array<IFeedItemProps>;
  nextPage: string | undefined;
}
