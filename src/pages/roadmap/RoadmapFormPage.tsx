import styled from 'styled-components';
import { ReactFlowProvider } from 'reactflow';
import Layout from '../../layout/Layout';
import { SubTitle, Paragraph } from '../../components';
import RoadmapForm from '../../feature/roadmap/RoadmapForm';

export const RoadmapFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 800px;
  margin-top: 3rem;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const RoadmapFormPage = () => {
  return (
    <Layout>
      <RoadmapFormWrapper>
        <TitleWrapper>
          <SubTitle margin="0 1rem 0 0">로드맵 생성</SubTitle>
          <Paragraph sizeType="base">본인만의 로드맵을 생성해보세요.</Paragraph>
        </TitleWrapper>

        <ReactFlowProvider>
          <RoadmapForm />
        </ReactFlowProvider>
      </RoadmapFormWrapper>
    </Layout>
  );
};

export default RoadmapFormPage;
