export interface IBestAnswer {
  answerId: number;
  questionId: number;
  author: {
    username: string;
    image?: string;
    company?: string;
    isFollowed: boolean;
  };
  content: string;
  likeCount: number;
}

export interface IBestAnswerer {
  rank: number; // 1 ~ 5까지
  author: {
    username: string;
    image?: string;
    company?: string;
    isFollowed: boolean;
  };
}

export interface IBestCompany {
  rank: number; // 1 ~ 5까지
  companyName: string;
}

export interface IRank {
  bestAnswer: IBestAnswer;
  bestAnswererList: Array<IBestAnswerer>;
  bestCompanyList: Array<IBestCompany>;
}
