import { IRoadmapPost } from '../../interface/roadmap';
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

export const getPopularRoadmapList = () => authApi.get('/roadmap/popular').then((res) => res.data);

export const getRoadmapStatus = () => authApi.get('/user/roadmap').then((res) => res.data);
