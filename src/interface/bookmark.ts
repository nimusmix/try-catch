export interface IBookmarkBody {
  id: number;
  type: 'QUESTION' | 'FEED' | 'ROADMAP';
}

export interface IBookmarkQuestion {
  questionId: number;
  title: string;
  content: string;
  tags: Array<string>;
  likeCount: number;
  answerCount: number;
  viewCount: number;
  createdAt: number;
}
