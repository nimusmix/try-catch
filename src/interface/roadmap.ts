export interface INode {
  width: number;
  height: number;
  id: string;
  position: { x: number; y: number };
  data: {
    value: string;
    label: string;
  };
  type: string;
  positionAbsolute: { x: number; y: number };
  selected: boolean;
  dragging: boolean;
}

export interface IEdge {
  id: string;
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
}

export interface IRoadmapPost {
  title: string;
  tag: string;
  nodes: string;
  edges: string;
}

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
  nodes: Array<INode>;
  edges: Array<IEdge>;
}

export interface IRoadmapList {
  author: {
    userId: number;
    userName: string;
    profileImage?: string;
    companyName?: string;
    isFollowed: boolean;
  };
  title: string;
  tag: string;
}
