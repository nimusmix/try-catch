import styled from 'styled-components';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import Layout from '../../layout/Layout';
import { Button } from '../../components';
import QnaFormHeader from '../../feature/qna/question-form/QnaFormHeader';
import QnaFormBody from '../../feature/qna/question-form/QnaFormBody';
import { useQuestionDispatch, useQuestionState } from '../../context/QnaContext';
import { getQuestionDetail, postQuestion, putQuestion } from '../../apis/qna/qna';
import { logOnDev } from '../../utils/logging';
import { toastState } from '../../recoil';

const QnaFormContainer = styled.div`
  display: flex;
  min-width: var(--breakpoints-desktop);
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 70%;
  max-width: var(--breakpoints-desktop);

  h3 {
    margin: 2.5rem 0 0.5rem;
  }
`;

const QnaFormFooter = styled.div`
  margin-bottom: 3rem;
`;

const TooltipAside = styled.aside`
  position: relative;
  width: 100%;
`;

export const Required = styled.span`
  color: tomato;
  line-height: 2rem;
  margin-left: 0.5rem;
`;

const QnaFormPage = ({ edit }: { edit?: boolean }) => {
  const setToast = useSetRecoilState(toastState);
  const { content, category, errorCode, title, tags } = useQuestionState();
  const dispatch = useQuestionDispatch();
  const navigate = useNavigate();
  const { questionId } = useParams();
  const queryClient = useQueryClient();
  const { data: question, isLoading } = useQuery(
    ['question', `${questionId}`],
    getQuestionDetail(Number(questionId)),
    {
      onSuccess: (q) => {
        dispatch({ type: 'SET_CATEGORY', category: q.category });
        dispatch({ type: 'SET_TITLE', title: q.title });
        dispatch({ type: 'SET_CONTENT', content: q.content });
        dispatch({ type: 'SET_ERROR_CODE', errorCode: q.errorCode });
        dispatch({ type: 'SET_TAGS', tags: q.tags });
      },
      enabled: !!edit,
    }
  );

  const { mutate: addQuestion } = useMutation(
    postQuestion({ content, category, errorCode, title, tags }),
    {
      onSuccess: () => {
        navigate('/question', { replace: true });
        queryClient.invalidateQueries(['question', 'questionList', 'DEV']);
        setToast({ type: 'positive', message: '질문 작성 성공', isVisible: true });
        dispatch({ type: 'RESET' });
      },

      onError: () => {
        setToast({ type: 'negative', message: '질문 작성 실패', isVisible: true });
      },
    }
  );

  const { mutate: modifyQuestion } = useMutation(
    putQuestion(Number(questionId), { content, category, errorCode, title, tags, hidden: false }),
    {
      onSuccess: () => {
        navigate('/question', { replace: true });
        setToast({ type: 'positive', message: '질문 수정 성공', isVisible: true });
        dispatch({ type: 'RESET' });
      },

      onError: () => {
        setToast({ type: 'negative', message: '질문 수정 실패', isVisible: true });
      },
    }
  );

  const onClickSubmitQuestion = () => {
    if (!category.trim() || !title.trim() || !content.trim() || !errorCode.trim()) {
      logOnDev.log(category);
      logOnDev.log(title);
      logOnDev.log(content);
      logOnDev.log(errorCode);
      setToast({ type: 'negative', message: '필수 항목을 모두 입력해주세요.', isVisible: true });
      return;
    }

    if (edit) {
      modifyQuestion();
    } else {
      addQuestion();
    }
  };

  return (
    <>
      <Helmet>
        {questionId ? <title>트라이캐치 | 질문수정</title> : <title>트라이캐치 | 질문작성</title>}
      </Helmet>
      <Layout>
        <QnaFormContainer>
          <Section>
            <QnaFormHeader />
            <QnaFormBody edit={edit as boolean} />
            <QnaFormFooter>
              {questionId ? (
                <Button onClick={onClickSubmitQuestion}>수정</Button>
              ) : (
                <Button onClick={onClickSubmitQuestion}>작성</Button>
              )}
            </QnaFormFooter>
          </Section>
          <TooltipAside />
        </QnaFormContainer>
      </Layout>
    </>
  );
};

export default QnaFormPage;
