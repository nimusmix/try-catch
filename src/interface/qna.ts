export interface IQuestion {
  questionId: number;
  author: {
    userName: string;
    profileImage?: string;
    companyName?: string;
    isFollwed?: boolean;
  };
  category: string;
  title: string;
  content: string;
  errorCode: string;
  tags: Array<string>;
  likeCount: number;
  answerCount: number;
  timestamp: number;
  isLiked: boolean;
  isSolved: boolean;
  isBookmarked: boolean;
  answers: Array<IAnswer>;
}

export interface IAnswer {
  answerId: number;
  author: {
    userName: string;
    profileImage?: string;
    companyName?: string;
    isFollowed: boolean;
  };
  content: string;
  likeCount: number;
  isLiked: boolean;
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
