import styled from 'styled-components';
import { Slideshow } from '../../components';
import { HallOfFame, WaitForAnswer, TodayHot } from '../../feature/home';
import Layout from '../../layout/Layout';

const HomeBodySection = styled.section`
  display: flex;
  flex-direction: row;
  margin-top: 4.5rem;
`;

const RightBodySection = styled.div`
  display: flex;
  flex-direction: column;
`;

const HomePage = () => {
  return (
    <Layout>
      <Slideshow />
      <HomeBodySection>
        <WaitForAnswer />
        <RightBodySection>
          <TodayHot />
          <HallOfFame />
        </RightBodySection>
      </HomeBodySection>
    </Layout>
  );
};

export default HomePage;
