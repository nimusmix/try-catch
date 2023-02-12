import { ReactFlowProvider } from 'reactflow';
import { Layout } from '../../layout';
import { SubTitle, Paragraph } from '../../components';
import RoadmapForm from '../../feature/roadmap/RoadmapForm';
import { RoadmapFormWrapper as EditPageWrapper, TitleWrapper } from './RoadmapFormPage';

const RoadmapEditPage = () => {
  return (
    <Layout>
      <EditPageWrapper>
        <TitleWrapper>
          <SubTitle margin="0 1rem 0 0">로드맵 수정</SubTitle>
          <Paragraph sizeType="base">생성한 로드맵을 수정해보세요.</Paragraph>
        </TitleWrapper>

        <ReactFlowProvider>
          <RoadmapForm />
        </ReactFlowProvider>
      </EditPageWrapper>
    </Layout>
  );
};

export default RoadmapEditPage;
