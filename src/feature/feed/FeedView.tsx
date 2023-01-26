import { BsGrid, BsViewStacked } from 'react-icons/bs';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.button`
  margin: 0 0.2rem 0 0.4rem;
  cursor: pointer;
`;

const FeedView = () => {
  return (
    <Wrapper>
      <IconWrapper>
        <BsGrid size="16" />
      </IconWrapper>
      <IconWrapper>
        <BsViewStacked size="16" />
      </IconWrapper>
    </Wrapper>
  );
};

export default FeedView;
