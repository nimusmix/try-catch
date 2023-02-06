import styled from 'styled-components';
import HomeSectionTitle from './HomeSectionTitle';

const HallOfFameWrapper = styled.div`
  width: 500px;
  margin: 0 2rem 0 0;
  padding: 0 0 0 2rem;
`;

const HallOfFameBody = styled.article`
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  min-height: 400px;
`;

const HallOfFame = () => {
  return (
    <HallOfFameWrapper>
      <HomeSectionTitle title="명예의 전당" />
      <HallOfFameBody />
    </HallOfFameWrapper>
  );
};

export default HallOfFame;
