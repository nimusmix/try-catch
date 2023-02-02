import { IAnswer } from '../../interface/qna';

export interface IQuestion {
  questionId: number;
  author: {
    userId: number;
    userName: string;
    profileImage?: string;
    companyName?: string;
    isFollowed?: boolean;
  };
  category: string;
  title: string;
  content: string;
  errorCode: string;
  tags: Array<string>;
  likeCount: number;
  answerCount: number;
  viewCount: number;
  timestamp: number;
  isLiked: boolean;
  isSolved: boolean;
  isBookmarked: boolean;
  answers: Array<IAnswer>;
}
