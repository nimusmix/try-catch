export interface IAnswer {
  answerId: number;
  author: {
    userId: number;
    userName: string;
    profileImage?: string;
    companyName?: string;
    isFollowed: boolean;
  };
  content: string;
  timestamp: number;
  likeCount: number;
  isLiked: boolean;
}
