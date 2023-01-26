import { Link } from 'react-router-dom';
import { HeaderImage, Layout } from '../../layout';
import { Button, Paragraph, SubTitle } from '../../components';
import { header_roadmap } from '../../assets';
import EasyConnectExample from '../../feature/roadmap/EasyConnectSample';

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
      <br />
      <br />
      <Link to="form">
        <Button>내 로드맵 생성</Button>
      </Link>
      <EasyConnectExample />
    </Layout>
  );
};

export default RoadmapPage;
