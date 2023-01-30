import styled from 'styled-components';
import React, { Dispatch, SetStateAction } from 'react';
import { IconCard, IconList } from '../../components/icons/Icons';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.button`
  margin: 0 0.2rem 0 0.4rem;
  cursor: pointer;
`;

interface FeedViewProps {
  setActiveViewOption: Dispatch<SetStateAction<boolean>>;
}

const FeedView = ({ setActiveViewOption }: FeedViewProps) => {
  return (
    <Wrapper>
      <IconWrapper onClick={() => setActiveViewOption(true)}>
        <IconCard size="16" />
      </IconWrapper>
      <IconWrapper onClick={() => setActiveViewOption(false)}>
        <IconList size="16" />
      </IconWrapper>
    </Wrapper>
  );
};

export default FeedView;
