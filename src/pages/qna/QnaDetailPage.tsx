import Layout from '../../layout/Layout';
import { Answer, QnaDetailPopularQna, Question } from '../../feature/qna';
import { SubTitle } from '../../components';

const QnaDetailPage = () => {
  return (
    <Layout>
      <section style={{ marginBottom: '3rem' }} />
      <section style={{ display: 'flex' }}>
        <section style={{ margin: '0 4rem 0 1.5rem' }}>
          <Question />
          <br />
          <Answer />
        </section>
        <aside style={{ margin: '0' }}>
          <QnaDetailPopularQna />
        </aside>
      </section>
    </Layout>
  );
};

export default QnaDetailPage;
