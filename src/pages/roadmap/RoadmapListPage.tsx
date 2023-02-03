import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoadmapList from '../../feature/roadmap/RoadmapList';
import { HeaderImage, Layout } from '../../layout';
import { header_roadmap } from '../../assets';
import { SubTitle, Paragraph } from '../../components';
import SideNavbar from '../../components/side-navbar/SideNavbar';
import { Aside } from '../qna/QnaPage';
import { navOptions, RoadmapWrapper } from './RoadmapPage';

const ContentWrapper = styled.div`
  margin-top: 3rem;
  margin-left: 2rem;
  width: 942px;
`;

const RoadmapListPage = () => {
  const [activeCategory, setActiveCategory] = useState('커스텀');
  const navi = useNavigate();
  useEffect(() => {
    if (activeCategory === '공통') {
      navi('/roadmap');
    } else {
      navi('.');
    }
  }, [navi, activeCategory]);
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

      <RoadmapWrapper>
        <Aside>
          <SideNavbar navOptions={navOptions} changeOption={setActiveCategory} activeIdx={1} />
        </Aside>

        <ContentWrapper>
          <SubTitle>커스텀 로드맵 리스트</SubTitle>
          <RoadmapList />
        </ContentWrapper>
      </RoadmapWrapper>
    </Layout>
  );
};

export default RoadmapListPage;
