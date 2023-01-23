import Layout from '../../layout/Layout';
import { Question } from '../../feature/qna';
import { Title } from '../../components';

const ChallengesPage = () => {
  return (
    <Layout>
      <Title>Challenges Page</Title>
      <Question />
    </Layout>
  );
};

export default ChallengesPage;
