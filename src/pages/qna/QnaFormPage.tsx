import styled from 'styled-components';
import React, { createContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useRecoilValue } from 'recoil';
import Layout from '../../layout/Layout';
import { isDarkState } from '../../recoil';
import { Button } from '../../components';
import QnaFormHeader from '../../feature/qna/question-form/QnaFormHeader';
import QnaFormBody from '../../feature/qna/question-form/QnaFormBody';

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
  width: 100%;
  background: red;
`;

const QuestionContext = createContext({});

// TODO 02.01 context로 데이터 모으기
const QnaFormPage = () => {
  const isDark = useRecoilValue(isDarkState);

  // console.log('content', isContentFocus);
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
        <QuestionContext.Provider value="todo">
          <QnaFormContainer>
            <Section>
              <QnaFormHeader />
              <QnaFormBody />
              <QnaFormFooter>
                <Button>완료</Button>
              </QnaFormFooter>
            </Section>
            <TooltipAside />
          </QnaFormContainer>
        </QuestionContext.Provider>
      </Layout>
    </>
  );
};

export default QnaFormPage;
