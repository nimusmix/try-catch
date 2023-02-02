import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { MiniTitle } from '../../components';
import { IRoadmap } from '../../interface/roadmap';
import { getRoadmapDetail } from '../../apis/roadmap/roadmap';

const RoadmapDetailPage = () => {
  const { userName } = useParams();
  const { isLoading, data: roadmapDetail } = useQuery<IRoadmap>(['roadmap', userName], () =>
    getRoadmapDetail(String(userName))
  );
  return <MiniTitle sizeType="xl">{roadmapDetail?.title}</MiniTitle>;
};

export default RoadmapDetailPage;
