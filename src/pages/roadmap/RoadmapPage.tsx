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
  margin-bottom: 5rem;
`;

const RoadmapPage = () => {
  const [activeCategory, setActiveCategory] = useState('공통');
  const [isFirstRender, setIsFirstRender] = useState(true);
  const navi = useNavigate();
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    if (activeCategory === '공통') {
      navi('/roadmap');
    } else {
      navi('/roadmap/list');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  return (
    <Layout>
      <HeaderImage image={header_roadmap}>
        <SubTitle>로드맵</SubTitle>
        <Paragraph sizeType="base">선후배 개발자의 발자취를 따라가보세요</Paragraph>
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
