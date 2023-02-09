import { useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import styled from 'styled-components';
import React from 'react';
import { useRecoilValue } from 'recoil';
import Layout from '../../layout/Layout';
import { Answer, QnaDetailPopularQna, Question } from '../../feature/qna';
import { getQuestionDetail } from '../../apis/qna/qna';
import { AnswerForm } from '../../feature';
import { IQuestion } from '../../interface/qna';
import qnaCategoryState from '../../recoil/qnaCategoryState';
import { isLoggedInState } from '../../recoil';
import { useQuestionDispatch } from '../../context/QnaContext';

const QnaDetailWrapper = styled.section`
  margin-top: 3rem;
  max-width: var(--breakpoints-desktop);
  min-width: var(--breakpoints-desktop);
  display: flex;
`;

const QnaDetailMain = styled.section`
  width: 70%;
  margin-right: 2rem;

  & > ul {
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
  const dispatch = useQuestionDispatch();
  const isLogin = useRecoilValue(isLoggedInState);
  const { isFetching, data: questionDetail } = useQuery<IQuestion>(
    ['question', questionId] as const,
    getQuestionDetail(Number(questionId)),
    {
      onSuccess: (q) => {
        dispatch({ type: 'SET_CATEGORY', category: q.category });
        dispatch({ type: 'SET_TITLE', title: q.title });
        dispatch({ type: 'SET_CONTENT', content: q.content });
        dispatch({ type: 'SET_ERROR_CODE', errorCode: q.errorCode });
        dispatch({ type: 'SET_TAGS', tags: q.tags });
      },
      // initialData: () => {
      //   const questionDetail = queryClient
      //     .getQueryData(['question', 'questionList', qnaCategory])
      //     .pages.flatMap((page: Array<IQuestion>) => page.find((item) => Number(item.questionId) === Number(questionId));
      //
      //   return questionDetail;
      // },
    }
  );

  if (isFetching) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout>
      <QnaDetailWrapper>
        <QnaDetailMain>
          {/* 질문 부분 */}
          {questionDetail && <Question {...questionDetail} />}
          {/* 답변 form 부분 */}
          {isLogin && <AnswerForm questionId={questionId as string} />}
          <ul>
            {questionDetail &&
              questionDetail.answers
                .sort((a, b) => a.timestamp - b.timestamp)
                .sort((a, b) => Number(b.accepted) - Number(a.accepted))
                .map((answer) => {
                  return (
                    <Answer
                      key={answer.answerId}
                      answer={answer}
                      questionAuthorId={questionDetail.author.userId}
                      questionId={questionDetail.questionId}
                      isSolved={questionDetail.isSolved}
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
