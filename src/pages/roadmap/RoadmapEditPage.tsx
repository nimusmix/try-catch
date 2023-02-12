import styled from 'styled-components';
import { ReactFlowProvider } from 'reactflow';
import { useQuery } from 'react-query';
import { Layout } from '../../layout';
import { SubTitle, Paragraph } from '../../components';
import RoadmapForm from '../../feature/roadmap/RoadmapForm';
import { RoadmapFormWrapper as EditPageWrapper, TitleWrapper } from './RoadmapFormPage';
import { getName } from '../../apis/auth/auth';
import { getRoadmapDetail } from '../../apis/roadmap/roadmap';
import { IRoadmap } from '../../interface/roadmap';

const RoadmapEditPage = () => {
  const { data: myName } = useQuery<string>(['myName'], () => getName());
  const { data: roadmapDetail, isLoading } = useQuery<IRoadmap>(
    ['roadmap', myName] as const,
    () => getRoadmapDetail(myName!),
    { enabled: !!myName }
  );

  console.log('로드맵 디테일!!!', roadmapDetail);
  console.log(roadmapDetail?.title);
  console.log(roadmapDetail?.tag);
  return (
    <Layout>
      <EditPageWrapper>
        <TitleWrapper>
          <SubTitle margin="0 1rem 0 0">로드맵 수정</SubTitle>
          <Paragraph sizeType="base">생성한 로드맵을 수정해보세요.</Paragraph>
        </TitleWrapper>

        <ReactFlowProvider>
          <RoadmapForm
            title={roadmapDetail!.title}
            tag={roadmapDetail!.tag}
            nodes={roadmapDetail!.nodes}
            edges={roadmapDetail!.edges}
          />
        </ReactFlowProvider>
      </EditPageWrapper>
    </Layout>
  );
};

export default RoadmapEditPage;
