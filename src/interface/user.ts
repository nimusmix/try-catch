/**
 * /user/{userID}/list
 * follower or followee
 */
export interface ISimpleUserData {
  userId: number; // 고유값
  userName: string;
  profileImage?: string;
  companyName?: string;
  isFollowed: boolean;
}

export interface IUserAnswer {
  answerId: number;
  questionId: number;
  questionTitle: string;
  questionContent: string;
  timestamp: number;
  likeCount: number;
  isLiked: boolean;
  answerContent: string;
}

// export interface IUserAnswerList {
//   myAnswers: Array<IUserAnswer>;
// }

/**
 * /user/{userId}/question/list
 */

// export interface IQuestion {
//   questionId: number;
//   author: ISimpleUserData;
//   category: string;
//   title: string;
//   content: string;
//   tags: Array<string>;
//   likeCount: number;
//   answerCount: number;
//   timestamp: number;
//   isLiked: boolean;
//   isSolved: boolean;
//   isBookmarked: boolean;
//   answers?: Array<IAnswer>;
// }

// export interface IQuestionList {
//   questions: Array<IQuestion>;
// }

/**
 * /user/{userId}/history
 */
export interface IRepoHistory {
  // 깃허브 api를 모르겠습니다
  data: null;
}

/**
 * /user/{userId}/badge/list
 */
export interface IBadge {
  badgeId: number;
  badgeName: string;
  image: string;
}
export interface IBadgeList {
  badges: Array<IBadge>;
}

/**
 * /user/{userId}/recent/list
 */
export interface IFeed {
  feedId: number;
  title: string;
  content: string;
  companyName: string;
  publishedTimestamp: number;
  isBookmarked: boolean;
  blogURL: string;
  thumbnailImage: string;
  tags: Array<string>;
}
export interface IRecentList {
  recentFeeds: Array<IFeed>;
}

export interface ICompanyFeed {
  feedId: number;
  title: string;
  summary: string;
  companyName: string;
  createdAt: number;
  url: string;
  thumbnailImage: string;
  tags: Array<string>;
  keywords: Array<string>;
  isBookmarked: boolean;
}

/**
 * /user/{userId}/subscription/list
 */

// 기업 유저 정보
export interface ICompany {
  companyId: number;
  companyName: string;
  companyLogo: string;
  isSubscribe: boolean;
  subscriptionCount: number;
  companyBlog: string;
  companyFeed: Array<ICompanyFeed>;
}

// "유저의" 구독 기업 정보
export interface ISubscription {
  companyId: number;
  companyName: string;
  isSubscribe: boolean;
  logoSrc: string;
}

// "유저의" 구독 목록
export interface ISubscriptionList {
  subscriptions: Array<ISubscription>;
}

/**
 * /user/{userId}
 */

export interface IUserDetail {
  userId: number;
  userName: string;
  profileImg?: string;
  companyName?: string;
  subscriptionCount: number;
  followingCount: number;
  followerCount: number;
  introduction?: string;
  tags: Array<string>;
  isFollowed: boolean;
}
