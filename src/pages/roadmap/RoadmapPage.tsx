import { useState } from 'react';
import { Link, Outlet, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { HeaderImage, Layout } from '../../layout';
import { Button, Paragraph, SubTitle } from '../../components';
import SideNavbar from '../../components/side-navbar/SideNavbar';
import { Aside } from '../qna/QnaPage';
import { header_roadmap } from '../../assets';
import FERoadmapPage from './FERoadmapPage';

const navOptions = [
  { id: 1, option: '공통' },
  { id: 2, option: '커스텀' },
];

const RoadmapWrapper = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  margin-top: 3rem;
  margin-left: 2rem;
  width: 942px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RoadmapPage = () => {
  const [activeCategory, setActiveCategory] = useState('공통');
  const roadmapMatch = useMatch('roadmap');
  const BEMatch = useMatch('roadmap/be');

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

        <ContentWrapper>
          <ButtonWrapper>
            <div>
              <Link to="fe">
                <Button
                  margin="0 1rem 0 0"
                  borderRadius="var(--borders-radius-lg)"
                  designType={BEMatch ? 'blueEmpty' : 'blueFill'}
                >
                  프론트엔드
                </Button>
              </Link>
              <Link to="be">
                <Button
                  borderRadius="var(--borders-radius-lg)"
                  designType={BEMatch ? 'blueFill' : 'blueEmpty'}
                >
                  백엔드
                </Button>
              </Link>
            </div>
            <Link to="form">
              <Button borderRadius="var(--borders-radius-lg)">로드맵 생성</Button>
            </Link>
          </ButtonWrapper>
          {roadmapMatch ? <FERoadmapPage /> : <Outlet />}
        </ContentWrapper>
      </RoadmapWrapper>
    </Layout>
  );
};

export default RoadmapPage;
