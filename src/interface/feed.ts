export interface IFeedItem {
  feedId: number;
  title: string;
  content: string;
  companyName: string;
  timestamp: number;
  tags: Array<string>;
  isBookmarked: boolean;
  blogURL: string;
  thumbnailImage: string;
}

export interface IFeedList {
  feedList: Array<IFeedItem>;
}
