import styled from 'styled-components';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useRecoilValue } from 'recoil';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { isDarkState } from '../../recoil';
import { Button } from '../../components';
import QnaFormHeader from '../../feature/qna/question-form/QnaFormHeader';
import QnaFormBody from '../../feature/qna/question-form/QnaFormBody';
import { useQuestionState } from '../../context/QnaContext';
import { postQuestion } from '../../apis/qna/qna';
import { logOnDev } from '../../utils/logging';

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

/*
 * TODO
 *  Loading 시 처리
 * */
const QnaFormPage = () => {
  const isDark = useRecoilValue(isDarkState);
  const { content, category, errorCode, title, tags } = useQuestionState();
  const { mutate: addQuestion, isSuccess } = useMutation(
    postQuestion({ content, category, errorCode, title, tags })
  );
  const navigate = useNavigate();

  const onClickAddQuestion = () => {
    if (!category.trim() || !title.trim() || !content.trim() || !errorCode.trim()) {
      logOnDev.log(category);
      logOnDev.log(title);
      logOnDev.log(content);
      logOnDev.log(errorCode);
      alert('필수 목록이 비어있음');
    }
    addQuestion();
    if (isSuccess) {
      navigate('/question', { replace: true });
    }
  };

  return (
    <>
      <Helmet>
        <title>트라이캐치 | 질문작성</title>
        {isDark ? (
          <link href="https://unpkg.com/prism-themes/themes/prism-one-dark.css" rel="stylesheet" />
        ) : (
          <link href="https://unpkg.com/prism-themes/themes/prism-one-light.css" rel="stylesheet" />
        )}
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
