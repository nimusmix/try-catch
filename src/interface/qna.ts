export interface IAuthor {
  userId: number;
  userName: string;
  profileImage?: string;
  companyName?: string;
  isFollowed?: boolean;
}

export interface IAnswer {
  answerId: number;
  author: IAuthor;
  content: string;
  timestamp: number;
  updatedAt: number;
  likeCount: number;
  isLiked: boolean;
}

export interface IQuestion {
  questionId: number;
  author: IAuthor;
  category: string;
  title: string;
  content: string;
  errorCode: string;
  tags: Array<string>;
  likeCount: number;
  answerCount: number;
  viewCount: number;
  timestamp: number;
  updatedAt: number;
  isLiked: boolean;
  isSolved: boolean;
  isBookmarked: boolean;
  answers: Array<IAnswer>;
}

export interface IQuestionList {
  questionList: Array<IQuestion>;
  nextPage: string | undefined;
}

export interface IQuestionSearch {
  query: string;
  category: 'DEV' | 'CAREER' | 'BALANCE';
  page: number;
  size: number;
}

export interface ISearchedData {
  searchedCount: number;
  searchedTags: Array<string>;
  searchedQuestions: Array<IQuestion>;
}

export interface ISimilarErrorData {
  questionId: number;
  title: string;
}

export interface IPostQuestion {
  category: 'DEV' | 'CAREER' | 'BALANCE';
  title: string;
  content: string;
  errorCode: string;
  tags: Array<string>;
}
