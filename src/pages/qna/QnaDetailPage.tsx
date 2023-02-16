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
import { isLoggedInState } from '../../recoil';
import { useQuestionDispatch } from '../../context/QnaContext';
import QnaDetailSkeleton from '../../feature/qna/skeleton/QnaDetailSkeleton';
import qnaCategoryState from '../../recoil/qnaCategoryState';
import { media } from '../../utils/media';

const QnaDetailWrapper = styled.section`
  margin-top: 3rem;
  max-width: var(--breakpoints-desktop);
  min-width: var(--breakpoints-desktop);
  display: flex;

  ${media.phone`
    max-width: unset;
    min-width: unset;
    width: 100%;
    flex-direction: column;
  `}
`;

const QnaDetailMain = styled.section`
  width: 70%;
  margin-right: 2rem;

  & > ul {
    margin-bottom: 3rem;
  }
  ${media.phone`
    width: 100%;
  `}
`;

const Aside = styled.aside`
  position: sticky;
  top: 7rem;
  height: 500px;
  ${media.phone`
  background-color: ${({ theme: { isDark } }: any) =>
    isDark ? 'rgba(36,42,54)' : 'var(--colors-brand-100)'};
    position: static;
    padding: 1rem 1rem 0 1rem;
    top: unset;
    height: unset;
  `}
`;

const QnaDetailPage = () => {
  const { questionId } = useParams<string>();
  const dispatch = useQuestionDispatch();
  const isLogin = useRecoilValue(isLoggedInState);
  const queryClient = useQueryClient();
  const qnaCategory = useRecoilValue(qnaCategoryState);
  const { isLoading, data: questionDetail } = useQuery<IQuestion>(
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
      initialData: () => {
        const questionDetail = queryClient
          .getQueryData<any>(['question', 'questionList', qnaCategory])
          ?.pages.find((page: { data: Array<IQuestion> }) => page.data)
          .data.find((item: IQuestion) => item.questionId === Number(questionId));

        return questionDetail;
      },
    }
  );

  return (
    <Layout>
      <QnaDetailWrapper>
        <QnaDetailMain>
          {/* 질문 로딩 */}
          {isLoading && <QnaDetailSkeleton />}
          {/* 질문 */}
          {questionDetail && <Question {...questionDetail} />}
          {/* 답변 form */}
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
