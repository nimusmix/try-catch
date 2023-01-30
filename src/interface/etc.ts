export interface IBestAnswer {
  answerId: number;
  questionId: number;
  questionTitle: string;
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

export interface IBestAnswerer {
  rank: number; // 1 ~ 5까지
  author: {
    userName: string;
    profileImage?: string;
    companyName?: string;
    isFollowed: boolean;
  };
}

export interface IBestCompany {
  rank: number; // 1 ~ 5까지
  companyName: string;
}

// 명예의 전당
export interface IRank {
  // 금주의 답변
  bestAnswer: IBestAnswer;
  // 금주의 답변자 (1위 ~ 5위)
  bestAnswererList: Array<IBestAnswerer>;
  // 금주의 기업 (1위 ~ 5위)
  bestCompanyList: Array<IBestCompany>;
}
