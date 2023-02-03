import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { MiniTitle } from '../../components';
import { IRoadmap } from '../../interface/roadmap';
import { getRoadmapDetail } from '../../apis/roadmap/roadmap';
import { INode } from '../../feature/roadmap/RoadmapForm';

const RoadmapDetailPage = () => {
  const { userName } = useParams();
  const { status, data: roadmapDetail } = useQuery<IRoadmap>(['roadmap', userName], () =>
    getRoadmapDetail(userName!)
  );

  if (status === 'success') {
    const nodes = JSON.parse(roadmapDetail!.nodes);
    const edges = JSON.parse(roadmapDetail!.edges);
    nodes.map((node: INode) => console.log(node));
  }

  return <MiniTitle sizeType="xl">{roadmapDetail?.title}</MiniTitle>;
};

export default RoadmapDetailPage;
