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

/**
 * /user/{userId}/github
 */
// 그냥 타입 정의 필요없이 바로

/**
 * /user/{userId}/answer/list
 */
// export interface IAnswer {
//   author: ISimpleUserData;
//   answerId: number;
//   answerContent: string;
//   timestamp: number;
//   likeCount: number;
//   isLiked: boolean;
// }

// export interface IAnswerList {
//   answers: Array<IAnswer>;
// }

// export interface IUserAnswer extends Omit<IAnswer, 'author'> {
//   questionId: number;
//   questionTitle: string;
//   questionContent: string;
// }

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

/**
 * /user/{userId}/subscription/list
 */

// 기업 유저 정보
export interface ICompanyUser {
  companyId: number;
  name: string;
  image: string;
  subscriberCount: number;
  subscribers: Array<Omit<ISimpleUserData, 'isFollow'>>;
  feeds: Array<IFeed>;
}

// "유저의" 구독 기업 정보
export interface ISubscription {
  companyId: number;
  companyName: string;
  isSubscribe: boolean;
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
  // subscriptions: Array<ISubscription>;
  subscriptionCount: number;
  // followings: Array<ISimpleUserData>;
  followingCount: number;
  // followers: Array<ISimpleUserData>;
  followerCount: number;
  introduction?: string;
  tags: Array<string>;
  // questions: Array<IQuestion>;
  // answers: Array<IAnswer>;
  // recentFeeds: Array<IFeed>;
  // history: [];
  isFollowed: boolean;
}
