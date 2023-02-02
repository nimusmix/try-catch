import { IRoadmap } from './roadmap-type';
import { api, authApi } from '../../utils/axios-instance';

// 로드맵
export const postRoadmap = (data: IRoadmap) => authApi.post('/roadmap', data);

export const getRoadmapDetail = (roadmapId: string) =>
  api.get(`/roadmap/${roadmapId}`).then((res) => res.data);
