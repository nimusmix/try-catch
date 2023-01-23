import Layout from '../../layout/Layout';
import { Question, Answer } from '../../feature/qna';
import { Title } from '../../components';

const ChallengesPage = () => {
  return (
    <Layout>
      <Title>챌린지 메인</Title>
      <Question />
      <br />
      <Answer />
    </Layout>
  );
};

export default ChallengesPage;
