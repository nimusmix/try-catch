import { IRoadmap } from './roadmap-type';
import { authApi } from '../../utils/axios-instance';

// 로드맵
export const postRoadmap = (data: IRoadmap) => authApi.post('/roadmap', data);
