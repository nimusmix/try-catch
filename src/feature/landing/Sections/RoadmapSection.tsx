import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { Button, MiniTitle, Paragraph, SubTitle } from '../../../components';
import { IconRoadmap } from '../../../components/icons/Icons';

const fadeUp = keyframes`
  0% {
    filter: alpha(opacity=0);
    opacity: .1;
    transform: translateY(100px);
  }
  100% {
    filter: alpha(opacity=100);
    opacity: 1;
    transform: translateY(0);
  }
`;

const ThirdSection = styled.section`
  align-self: flex-end;
  height: 80vh;
  width: 100%;
  visibility: hidden;

  &.active {
    visibility: visible;
    animation: ${fadeUp} 2s;
  }

  .description {
    margin-bottom: 2rem;
    h2 {
      margin-bottom: 0.5rem;
    }

    h3 {
      margin-bottom: 0.1rem;
    }

    .title {
      cursor: pointer;
      transition: color 0.5s ease;
    }

    .title:hover {
      color: var(--colors-brand-500);
      scale: 1.01;
    }
  }

  .description > div:first-child {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .card-container {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  .button-wrapper {
    display: flex;
    justify-content: flex-start;
  }
`;
const RoadmapSection = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  return (
    <ThirdSection ref={ref} className={inView ? 'active' : ''}>
      <div className="description">
        <div>
          <SubTitle textAlign="left" display="inline-flex" className="title">
            <IconRoadmap />
            &nbsp;로드맵
          </SubTitle>
          <SubTitle textAlign="right">나만의 로드맵을 소개해보세요</SubTitle>
        </div>
        <MiniTitle sizeType="xl" textAlign="right">
          <span className="emph">로드맵</span> 탭을 이용해보세요
        </MiniTitle>
        <Paragraph sizeType="lg" textAlign="right">
          선후배 개발자들의 발자취를 따라가볼 수 있어요
        </Paragraph>
      </div>
      <div className="card-container" />
      <div className="button-wrapper">
        <Button onClick={() => navigate('/roadmap')}>로드맵 둘러보기</Button>
      </div>
    </ThirdSection>
  );
};

export default RoadmapSection;
