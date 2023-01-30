import { Link, Outlet, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { HeaderImage, Layout } from '../../layout';
import { Button, Paragraph, SubTitle } from '../../components';
import { header_roadmap } from '../../assets';
import FERoadmapPage from './FERoadmapPage';
import BERoadmapPage from './BERoadmapPage';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RoadmapPage = () => {
  const roadmapMatch = useMatch('roadmap');

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

      <ButtonWrapper>
        <Link to="fe">
          <Button>프론트엔드</Button>
        </Link>
        <Link to="be">
          <Button>백엔드</Button>
        </Link>
        <Link to="form">
          <Button>내 로드맵 생성</Button>
        </Link>
      </ButtonWrapper>
      {roadmapMatch ? <FERoadmapPage /> : <Outlet />}
    </Layout>
  );
};

export default RoadmapPage;
