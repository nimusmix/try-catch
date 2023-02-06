import styled from 'styled-components';
import HomeSectionTitle from './HomeSectionTitle';

const TodayHotWrapper = styled.div`
  width: 500px;
  margin: 0 2rem 0 0;
  padding: 0 0 0 2rem;
`;

const TodayHotBody = styled.article`
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  min-height: 200px;
`;

const TodayHot = () => {
  return (
    <TodayHotWrapper>
      <HomeSectionTitle title="오늘의 핫 이슈" />
      <TodayHotBody />
    </TodayHotWrapper>
  );
};

export default TodayHot;
