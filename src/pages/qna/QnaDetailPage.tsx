import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import Layout from '../../layout/Layout';
import { Answer, QnaDetailPopularQna, Question } from '../../feature/qna';
import { IQuestion } from '../../interface/qna';
import { getQuestionDetail } from '../../apis/qna/qna';

const QnaDetailPage = () => {
  const { questionId } = useParams();
  const { isLoading, data: questionDetail } = useQuery<IQuestion>(['question'], () =>
    getQuestionDetail(Number(questionId))
  );

  return (
    <Layout>
      <section style={{ marginBottom: '3rem' }} />
      <section style={{ display: 'flex' }}>
        <section style={{ margin: '0 4rem 0 1.5rem' }}>
          {questionDetail && <Question question={questionDetail} />}
          <br />
          {questionDetail &&
            questionDetail.answers.map((ans) => <Answer key={ans.answerId} answer={ans} />)}
        </section>
        <aside style={{ margin: '0' }}>
          <QnaDetailPopularQna />
        </aside>
      </section>
    </Layout>
  );
};

export default QnaDetailPage;
