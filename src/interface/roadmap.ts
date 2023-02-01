export interface IRoadmap {
  author: {
    userId: number;
    userName: string;
    profileImage?: string;
    companyName?: string;
    isFollowed: boolean;
  };
  title: string;
  tag: string;
  nodes: string;
  edges: string;
}
