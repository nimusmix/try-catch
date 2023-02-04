import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import styled from 'styled-components';
import React, { useState } from 'react';
import Layout from '../../layout/Layout';
import { Answer, QnaDetailPopularQna, Question } from '../../feature/qna';
import { getQuestionDetail } from '../../apis/qna/qna';
import { IQuestion } from '../../apis/qna/qna-type';
import { AnswerForm } from '../../feature';

const QnaDetailWrapper = styled.section`
  margin-top: 3rem;
  max-width: var(--breakpoints-desktop);
  display: flex;
`;

const QnaDetailMain = styled.section`
  width: 70%;
  margin-right: 2rem;

  ul {
    margin-bottom: 10rem;
  }
`;

const Aside = styled.aside`
  position: sticky;
  top: 7rem;
  height: 500px;
`;

const QnaDetailPage = () => {
  const { questionId } = useParams<string>();
  const { isLoading, data: questionDetail } = useQuery<IQuestion>(
    ['question', questionId] as const,
    getQuestionDetail(questionId as string)
  );

  const [questionInput, setQuestionInput] = useState('');

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout>
      <QnaDetailWrapper>
        <QnaDetailMain>
          {isLoading && 'Loading...'}
          {questionDetail && <Question {...questionDetail} />}

          <AnswerForm questionId={questionId as string} />
          <ul>
            {questionDetail &&
              questionDetail.answers.map((answer) => (
                <Answer key={answer.answerId} answer={answer} setQuestionInput={setQuestionInput} />
              ))}
          </ul>
        </QnaDetailMain>
        <Aside>
          <QnaDetailPopularQna />
        </Aside>
      </QnaDetailWrapper>
    </Layout>
  );
};

export default QnaDetailPage;
