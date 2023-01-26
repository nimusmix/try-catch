export interface ITag {
  id: number;
  tagName: string;
}

export interface IFeedItem {
  feedId: number;
  title: string;
  desc: string;
  companyName: string;
  timestamp: number;
  tags: ITag[];
  isBookmarked: boolean;
  blogURL: string;
  thumbnailImage: string;
}

export interface IFeedList {
  feedList: Array<IFeedItem>;
}
