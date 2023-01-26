import React from 'react';
import styled from 'styled-components';
import { SubTitle } from '../../../components';

const Wrapper = styled.div`
  margin: 3rem 0 5rem;
  align-self: flex-start;
`;
const LandingTitle = () => {
  return (
    <Wrapper>
      <SubTitle>함께 지식과 경험을 공유하며 좋은 개발자로 성장해요</SubTitle>
    </Wrapper>
  );
};

export default LandingTitle;
