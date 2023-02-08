import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';
import { IconCard, IconList } from '../../components/icons/Icons';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.button`
  margin: 0 0 0 0.1rem;
  padding: 0.3rem;
  cursor: pointer;
  border-radius: 6px;
  :hover {
    background: rgba(2, 32, 71, 0.08);
  }
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
