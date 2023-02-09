import { INode, IRoadmapPost } from '../../interface/roadmap';
import { api, authApi } from '../../utils/axios-instance';

// 로드맵
export const postRoadmap = (data: IRoadmapPost) => authApi.post('/roadmap', data);

export const getRoadmapDetail = (userName: string) =>
  authApi.get(`/roadmap/${userName}`).then((res) => {
    const {
      roadmapId,
      author,
      title,
      tag,
      nodes,
      edges,
      isBookmarked,
      isLiked,
      likeCount,
      createdAt,
      updatedAt,
    } = res.data;
    const newNodes = JSON.parse(nodes);
    // newNodes.map((node: INode) => Object.assign(node, { type: 'content' }));
    const newEdges = JSON.parse(edges);

    return {
      roadmapId,
      author,
      title,
      tag,
      nodes: newNodes,
      edges: newEdges,
      isBookmarked,
      isLiked,
      likeCount,
      createdAt,
      updatedAt,
    };
  });

export const getRoadmapList = () => authApi.get('/roadmap/list').then((res) => res.data);
