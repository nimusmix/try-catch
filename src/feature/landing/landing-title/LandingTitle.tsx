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

const bounceInTop = keyframes`
  0% {
  -webkit-transform: translateY(-500px);
  transform: translateY(-500px);
  -webkit-animation-timing-function: ease-in;
  animation-timing-function: ease-in;
  opacity: 0;
}
  38% {
  -webkit-transform: translateY(0);
  transform: translateY(0);
  -webkit-animation-timing-function: ease-out;
  animation-timing-function: ease-out;
  opacity: 1;
}
  55% {
  -webkit-transform: translateY(-65px);
  transform: translateY(-65px);
  -webkit-animation-timing-function: ease-in;
  animation-timing-function: ease-in;
}
  72% {
  -webkit-transform: translateY(0);
  transform: translateY(0);
  -webkit-animation-timing-function: ease-out;
  animation-timing-function: ease-out;
}
  81% {
  -webkit-transform: translateY(-28px);
  transform: translateY(-28px);
  -webkit-animation-timing-function: ease-in;
  animation-timing-function: ease-in;
}
  90% {
  -webkit-transform: translateY(0);
  transform: translateY(0);
  -webkit-animation-timing-function: ease-out;
  animation-timing-function: ease-out;
}
  95% {
  -webkit-transform: translateY(-8px);
  transform: translateY(-8px);
  -webkit-animation-timing-function: ease-in;
  animation-timing-function: ease-in;
}
  100% {
  -webkit-transform: translateY(0);
  transform: translateY(0);
  -webkit-animation-timing-function: ease-out;
  animation-timing-function: ease-out;
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
