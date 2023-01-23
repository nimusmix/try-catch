import Layout from '../../layout/Layout';
import { Question, Answer } from '../../feature/qna';
import { Title } from '../../components';

const QnaDetailPage = () => {
  return (
    <Layout>
      <Title>QnaDetailPage</Title>
      <Question />
      <br />
      <Answer />
    </Layout>
  );
};

export default QnaDetailPage;
