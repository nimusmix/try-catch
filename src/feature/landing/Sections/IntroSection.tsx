import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { Button, MiniTitle, Paragraph, SubTitle } from '../../../components';

const fadeFromLeft = keyframes`
  0% {
    filter: alpha(opacity=0);
    opacity: .1;
    transform: translateX(-100%);
  }
  100% {
    filter: alpha(opacity=100);
    opacity: 1;
    transform: translateX(0);
  }
`;

const FirstSection = styled.section`
  align-self: flex-start;
  height: 80vh;
  width: 100%;

  visibility: hidden;

  &.active {
    visibility: visible;
    animation: ${fadeFromLeft} 1s;
  }

  & > div {
    display: flex;
    margin-bottom: 1rem;
  }

  .description {
    flex: 1;
    h2 {
      margin-bottom: 0.1rem;
    }
    h3 {
      margin-bottom: 0.8rem;
    }

    p {
      margin-bottom: 0.4rem;
    }
  }

  .image {
    flex: 1;
  }
`;
const IntroSection = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  return (
    <FirstSection ref={ref} className={inView ? 'active' : ''}>
      <div>
        <div className="description">
          <SubTitle textAlign="left">이제는 혼자 개발하지 말고,</SubTitle>
          <MiniTitle sizeType="3xl" textAlign="left">
            트라이캐치와 함께 하세요!
          </MiniTitle>
          <Paragraph sizeType="lg">
            트라이캐치는 개인 추천~~ blah blah blah blah <br /> 개발자 커뮤니티 입니다.
          </Paragraph>
          <Paragraph sizeType="lg">
            다양한 기업의 개발 블로그 부터 Q&A 까지 <br /> 양질의 다양한 컨텐츠와 함께 공부를
            이어가세요.
          </Paragraph>
        </div>
        <div className="image">그림</div>
      </div>
      <div className="button-wrapper">
        <Button onClick={() => navigate('/home')} width="120px">
          둘러보기
        </Button>
      </div>
    </FirstSection>
  );
};

export default IntroSection;
