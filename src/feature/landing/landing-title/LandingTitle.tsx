import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { SubTitle } from '../../../components';

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

const Wrapper = styled.div`
  margin: 3rem 0 10rem;
  align-self: flex-start;
  visibility: hidden;
  &.active {
    visibility: visible;
    animation: ${fadeUp} 1s;
  }
`;

const LandingTitle = () => {
  const { ref, inView } = useInView();
  return (
    <Wrapper ref={ref} className={inView ? 'active' : ''}>
      <SubTitle>함께 지식과 경험을 공유하며 좋은 개발자로 성장해요!</SubTitle>
    </Wrapper>
  );
};

export default LandingTitle;
