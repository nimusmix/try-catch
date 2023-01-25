import { HeaderImage, Layout } from '../../layout';
import { SubTitle, Paragraph } from '../../components';
import { header_roadmap } from '../../assets';
import Flow from './ReactFlowTest';

const RoadmapPage = () => {
  return (
    <Layout>
      <HeaderImage image={header_roadmap}>
        <SubTitle color="var(--colors-black-500)" margin="0 0 0.2rem 0">
          로드맵
        </SubTitle>
        <Paragraph sizeType="base" color="var(--colors-black-400)">
          로드맵 게시판에 대한 설명이 들어갈 자리입니다.
        </Paragraph>
      </HeaderImage>
      <Flow />
    </Layout>
  );
};

export default RoadmapPage;
