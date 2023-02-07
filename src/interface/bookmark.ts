import { IEdge, INode } from './roadmap';

export interface IBookmarkBody {
  id: number;
  type: 'QUESTION' | 'FEED' | 'ROADMAP';
}

export interface IBookmarkQuestion {
  questionId: number;
  title: string;
  content: string;
  category: string;
  tags: Array<string>;
  likeCount: number;
  answerCount: number;
  viewCount: number;
  createdAt: number;
}

export interface IBookmarkRoadMap {
  roadmapId: number;
  author: {
    userId: number;
    userName: string;
    profileImage: string;
    companyName: string;
    isFollowed: boolean;
  };
  title: string;
  tag: string;
  nodes: Array<INode>;
  edges: Array<IEdge>;
  likeCount: number;
  createdAt: number;
  updatedAt: number;
}
