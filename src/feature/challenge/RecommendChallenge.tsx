import styled from 'styled-components';
import { Div } from '../../components';
import RecommendCarousel from './RecommendCarousel';

const RecommendChallengeWrapper = styled(Div)`
  margin-top: 1rem;
  border-radius: var(--borders-radius-base);
  overflow: hidden;
`;

const RecommendChallenge = () => {
  return (
    <RecommendChallengeWrapper padding="0rem">
      <RecommendCarousel />
    </RecommendChallengeWrapper>
  );
};

export default RecommendChallenge;
