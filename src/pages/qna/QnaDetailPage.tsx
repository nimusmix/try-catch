import { useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import styled from 'styled-components';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import Layout from '../../layout/Layout';
import { Answer, QnaDetailPopularQna, Question } from '../../feature/qna';
import { getQuestionDetail } from '../../apis/qna/qna';
import { AnswerForm } from '../../feature';
import { IQuestion } from '../../interface/qna';
import qnaCategoryState from '../../recoil/qnaCategoryState';

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
  const queryClient = useQueryClient();
  const qnaCategory = useRecoilValue(qnaCategoryState);
  const [questionInput, setQuestionInput] = useState('');
  const { isLoading, data: questionDetail } = useQuery<IQuestion>(
    ['question', questionId] as const,
    getQuestionDetail(questionId as string)
    /* {
      initialData: () => {
        const questionDetail = queryClient
          .getQueryData<Array<IQuestion>>(['question', 'questionList', qnaCategory])
          ?.find((question: IQuestion) => question.questionId === Number(questionId));

        return questionDetail;
      },
    } */
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout>
      <QnaDetailWrapper>
        <QnaDetailMain>
          {/* 질문 부분 */}
          {questionDetail && <Question {...questionDetail} />}
          {/* 답변 form 부분 */}
          <AnswerForm questionId={questionId as string} questionInput={questionInput} />
          <ul>
            {questionDetail &&
              questionDetail.answers
                .sort((a, b) => a.timestamp - b.timestamp)
                .map((answer) => {
                  return (
                    <Answer
                      key={answer.answerId}
                      answer={answer}
                      setQuestionInput={setQuestionInput}
                      questionId={questionDetail.questionId}
                    />
                  );
                })}
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
