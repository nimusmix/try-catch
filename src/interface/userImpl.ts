import {
  IAnswer,
  IAnswerList,
  IBadge,
  IBadgeList,
  ICompanyUser,
  IFeed,
  IQuestion,
  IQuestionList,
  IRecentList,
  IRepoHistory,
  ISimpleUserData,
  ISubscription,
  ISubscriptionList,
  IUser,
  IUserAnswer,
  IUserAnswerList,
} from './user';

const answer: IAnswer = {
  answerId: 1,
  answerContent: '답변 본문',
  author: {
    id: 123,
    userName: '답변자 이름',
    companyName: '답변자 회사 이름',
    image: '답변자 사진',
    isFollow: false,
  },
  isLiked: true,
  likeCount: 1,
  timestamp: 1231231,
};

const answerList: IAnswerList = {
  answers: [answer],
};

const subscription: ISubscription = {
  companyId: 1,
  companyName: '네이버',
  isSubscribe: true,
};
const subscriptionList: ISubscriptionList = {
  subscriptions: [subscription],
};

const badge: IBadge = {
  badgeId: 1,
  badgeName: '1등 뱃지',
  image: '뱃지 이미지 url',
};

const badgeList: IBadgeList = {
  badges: [badge],
};
const userAnswer: IUserAnswer = {
  answerId: 123,
  questionId: 1,
  questionTitle: '답변을 등록한 글의 제목',
  questionContent: '답변을 등록한 글의 내용',
  timestamp: 1234515,
  likeCount: 1,
  isLiked: true,
  answerContent: '답변 내용',
};
const userAnswerList: IUserAnswerList = {
  myAnswers: [userAnswer],
};

const simpleUserData: ISimpleUserData = {
  id: 1,
  image: '유저 이미지',
  userName: '유저 이름',
  companyName: '유저 회사명',
  isFollow: true,
};

const question: IQuestion = {
  questionId: 1,
  author: {
    id: 123,
    userName: '유저 이름',
    image: '유저 이미지',
    companyName: '회사 이름',
    isFollow: false,
  },
  category: '개발',
  title: 'question 제목',
  content: 'question 내용',
  tags: ['태그1', '태그2'],
  likeCount: 2,
  answerCount: 3,
  timestamp: 12314213,
  isLiked: true,
  isSolved: true,
  isBookmarked: true,
  answers: [answer],
};
const questionList: IQuestionList = {
  questions: [question],
};
const feed: IFeed = {
  feedId: 100,
  blogURL: '블로그 주소',
  companyName: '기업명',
  title: '피드 제목',
  content: '피드 내용',
  tags: ['태그1', '태그2'],
  isBookmarked: true,
  thumbnailImage: '썸네일 url',
  publishedTimestamp: 1231232131,
};
const recentList: IRecentList = {
  recentFeeds: [feed],
};
const repoHistory: IRepoHistory = {
  data: null,
};

const companyUser: ICompanyUser = {
  companyId: 1,
  image: '회사 사진',
  name: '회사 이름',
  feeds: [feed],
  subscriberCount: 100,
  subscribers: [simpleUserData],
};

const user: IUser = {
  userId: 10,
  name: '유저 이름',
  companyName: '회사 이름',
  tags: ['리액트', '자바'],
  followeeCount: 1,
  followerCount: 1,
  isFollowed: false,
  answers: [answer],
  history: [],
  questions: [question],
  recentFeeds: [feed],
  subscriptions: [subscription],
};
