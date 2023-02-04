import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HeaderImage, Layout } from '../../layout';
import { Paragraph, SubTitle } from '../../components';
import SideNavbar from '../../components/side-navbar/SideNavbar';
import { Aside } from '../qna/QnaPage';
import { header_roadmap } from '../../assets';
import RoadmapMain from '../../feature/roadmap/RoadmapMain';

export const navOptions = [
  { id: 1, option: '공통', value: '공통' },
  { id: 2, option: '커스텀', value: '커스텀' },
];

export const RoadmapWrapper = styled.div`
  display: flex;
`;

const RoadmapPage = () => {
  const [activeCategory, setActiveCategory] = useState('공통');
  const navi = useNavigate();
  useEffect(() => {
    if (activeCategory === '공통') {
      navi('/roadmap');
    } else {
      navi('./list');
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
          <SideNavbar navOptions={navOptions} changeOption={setActiveCategory} />
        </Aside>

        <RoadmapMain />
      </RoadmapWrapper>
    </Layout>
  );
};

export default RoadmapPage;
