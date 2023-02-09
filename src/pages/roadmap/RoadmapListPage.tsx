import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderImage, Layout } from '../../layout';
import { header_roadmap } from '../../assets';
import { SubTitle, Paragraph, MiniTitle } from '../../components';
import SideNavbar from '../../components/side-navbar/SideNavbar';
import { Aside } from '../qna/QnaPage';
import { navOptions, RoadmapWrapper } from './RoadmapPage';
import NewRoadmap from '../../feature/roadmap/NewRoadmap';
import PopularRoadmap from '../../feature/roadmap/PopularRoadmap';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  margin-left: 1rem;
  width: 958px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 0 1rem 0.75rem;

  p {
    color: ${({ theme }) => theme.textColor100};
  }
`;

const RoadmapListPage = () => {
  const [activeCategory, setActiveCategory] = useState('커스텀');
  const navi = useNavigate();
  // useEffect(() => {
  if (activeCategory === '공통') {
    navi('/roadmap');
  } else {
    navi('/roadmap/list');
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Layout>
      <HeaderImage image={header_roadmap}>
        <SubTitle>로드맵</SubTitle>
        <Paragraph sizeType="base">로드맵 게시판에 대한 설명이 들어갈 자리입니다.</Paragraph>
      </HeaderImage>

      <RoadmapWrapper>
        <Aside>
          <SideNavbar navOptions={navOptions} changeOption={setActiveCategory} activeIdx={1} />
        </Aside>

        <ContentWrapper>
          <TitleWrapper>
            <MiniTitle sizeType="2xl" fontWeight="600">
              인기 로드맵 🔥
            </MiniTitle>
            <Paragraph sizeType="base">가장 인기 있는 로드맵을 확인해보세요!</Paragraph>
          </TitleWrapper>
          <PopularRoadmap />

          <TitleWrapper>
            <MiniTitle sizeType="2xl" fontWeight="600">
              새로운 로드맵 🎉
            </MiniTitle>
            <Paragraph sizeType="base">새로 생성된 로드맵을 확인해보세요!</Paragraph>
          </TitleWrapper>
          <NewRoadmap />
        </ContentWrapper>
      </RoadmapWrapper>
    </Layout>
  );
};

export default RoadmapListPage;
