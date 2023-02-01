import React from 'react';
import styled from 'styled-components';
import { Input, MiniTitle } from '../../../components';

const Wrapper = styled.div`
  span {
    color: ${({ theme: { textColor100 } }) => textColor100};
    font-size: var(--fonts-body-base);
  }

  margin-bottom: 1.5rem;
`;
const QnaFormTagSection = () => {
  return (
    <Wrapper>
      <MiniTitle sizeType="xl" textAlign="left">
        태그 <span>(최대 10개)</span>
      </MiniTitle>
      <Input placeholder="태그 입력" width="100%" padding="0 0.5rem" height="2.5rem" />
    </Wrapper>
  );
};

export default QnaFormTagSection;
