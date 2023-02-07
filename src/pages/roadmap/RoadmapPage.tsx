import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createBrowserHistory } from 'history';
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
  const history = createBrowserHistory();
  const navi = useNavigate();
  useEffect(() => {
    if (activeCategory === '공통') {
      navi('/roadmap');
    } else {
      navi('/roadmap/list');
    }
  }, [navi, activeCategory]);

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === 'POP') {
        navi(-1);
      }
    });
  });

  return (
    <Layout>
      <HeaderImage image={header_roadmap}>
        <SubTitle>로드맵</SubTitle>
        <Paragraph sizeType="base">로드맵 게시판에 대한 설명이 들어갈 자리입니다.</Paragraph>
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
