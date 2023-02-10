import React from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { SubTitle } from '../../../components';

const Wrapper = styled.div`
  margin: 3rem 0 10rem;
  align-self: flex-start;
  opacity: 0;
  transition: all 5s ease;

  &.active {
    opacity: 1;
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
