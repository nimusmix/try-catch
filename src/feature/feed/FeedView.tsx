import { BsGrid, BsViewStacked } from 'react-icons/bs';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const FeedView = () => {
  return (
    <Wrapper>
      <div style={{ margin: '0 0.2rem 0 0.4rem' }}>
        <BsGrid size="16" />
      </div>
      <div style={{ margin: '0 0.4rem 0 0.2rem' }}>
        <BsViewStacked size="16" />
      </div>
    </Wrapper>
  );
};

export default FeedView;
