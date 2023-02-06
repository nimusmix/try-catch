import styled from 'styled-components';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import Layout from '../../layout/Layout';
import { Button } from '../../components';
import QnaFormHeader from '../../feature/qna/question-form/QnaFormHeader';
import QnaFormBody from '../../feature/qna/question-form/QnaFormBody';
import { useQuestionState } from '../../context/QnaContext';
import { postQuestion } from '../../apis/qna/qna';
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
    margin: 2.5rem 0 1rem;
  }
`;

const QnaFormFooter = styled.div`
  margin-bottom: 3rem;
`;

const TooltipAside = styled.aside`
  position: relative;
  width: 100%;
`;

const QnaFormPage = () => {
  const setToast = useSetRecoilState(toastState);
  const { content, category, errorCode, title, tags } = useQuestionState();
  const navigate = useNavigate();
  const { mutate: addQuestion } = useMutation(
    postQuestion({ content, category, errorCode, title, tags }),
    {
      onSuccess: () => {
        navigate('/question', { replace: true });
        setToast({ type: 'positive', message: '질문 작성 성공', isVisible: true });
      },

      onError: () => {
        setToast({ type: 'negative', message: '질문 작성 실패', isVisible: true });
      },
    }
  );

  const onClickAddQuestion = () => {
    if (!category.trim() || !title.trim() || !content.trim() || !errorCode.trim()) {
      logOnDev.log(category);
      logOnDev.log(title);
      logOnDev.log(content);
      logOnDev.log(errorCode);
      setToast({ type: 'negative', message: '필수 항목을 모두 입력해주세요.', isVisible: true });
      return;
    }
    addQuestion();
  };

  return (
    <>
      <Helmet>
        <title>트라이캐치 | 질문작성</title>
      </Helmet>
      <Layout>
        <QnaFormContainer>
          <Section>
            <QnaFormHeader />
            <QnaFormBody />
            <QnaFormFooter>
              <Button onClick={onClickAddQuestion}>완료</Button>
            </QnaFormFooter>
          </Section>
          <TooltipAside />
        </QnaFormContainer>
      </Layout>
    </>
  );
};

export default QnaFormPage;
