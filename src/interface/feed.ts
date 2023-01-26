export interface ITag {
  id: number;
  tagName: string;
}

export interface IFeedItem {
  type: string;
  feedId: number;
  title: string;
  desc: string;
  companyName: string;
  timestamp: number; // timestamp 긴 버전
  tags: ITag[];
  isBookmarked: boolean;
  blogURL: string;
  thumbnailImage: string;
}

export interface IFeedList {
  feedList: Array<IFeedItem>;
}
