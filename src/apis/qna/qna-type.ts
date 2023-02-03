export interface IAuthor {
  userId: number;
  userName: string;
  profileImage: string;
  companyName: string;
  isFollowed: boolean;
}

export interface IAnswer {
  answerId: number;
  author: IAuthor;
  content: string;
  timestamp: any;
  updatedAt: any;
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

export interface IPostQuestion {
  category: 'DEV' | 'CAREER';
  title: string;
  content: string;
  errorCode: string;
  tags: Array<string>;
}
