import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { MiniTitle, Paragraph, SubTitle } from '../../../components';
import IntroLottie from '../IntroLottie';

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

const fadeFromRight = keyframes`
  0% {
    filter: alpha(opacity=0);
    opacity: .1;
    transform: translateX(100%);
  }
  100% {
    filter: alpha(opacity=100);
    opacity: 1;
    transform: translateX(0);
  }
`;

const FirstSection = styled.section`
  align-self: flex-start;
  height: 100vh;
  width: 100%;

  & > div {
    display: flex;
    margin-bottom: 1rem;
  }

  .description {
    flex: 1;
    z-index: 10;
    h2 {
      margin-bottom: 0.1rem;
    }
    h3 {
      margin-bottom: 0.8rem;
    }

    p {
      margin-bottom: 0.4rem;
    }
    visibility: hidden;

    &.active {
      visibility: visible;
      animation: ${fadeFromLeft} 1s;
    }
  }

  .image {
    visibility: hidden;

    &.active {
      visibility: visible;
      animation: ${fadeFromRight} 1s;
    }
  }
`;

const IntroSection = () => {
  const { ref: descRef, inView: descInView } = useInView();
  const { ref: imageRef, inView: imageInView } = useInView({ rootMargin: '0px 0px -200px 0px' });
  return (
    <FirstSection>
      <div>
        <div ref={descRef} className={`description ${descInView ? 'active' : ''}`}>
          <SubTitle textAlign="left">이제는 혼자 개발하지 말고,</SubTitle>
          <MiniTitle sizeType="3xl" textAlign="left">
            <span className="emph blue">트라이캐치</span>와 함께 하세요!
          </MiniTitle>

          <Paragraph sizeType="lg">
            트라이캐치는 개발자를 위한 기능이 가득한 <br /> 개발자 중심 커뮤니티입니다.
          </Paragraph>
          <Paragraph sizeType="lg">
            다양한 기업의 기술 블로그부터 Q&A까지 <br /> 다양한 맞춤 컨텐츠와 함께 공부를
            이어가세요.
          </Paragraph>
        </div>
        <IntroLottie innerRef={imageRef} className={`image ${imageInView ? 'active' : ''}`} />
      </div>
    </FirstSection>
  );
};

export default IntroSection;
