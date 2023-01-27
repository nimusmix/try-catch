import styled from 'styled-components';
import { IconCard, IconList } from '../../components/icons/Icons';

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
        <IconCard size="16" />
      </IconWrapper>
      <IconWrapper>
        <IconList size="16" />
      </IconWrapper>
    </Wrapper>
  );
};

export default FeedView;
