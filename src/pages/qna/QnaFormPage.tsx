import styled from 'styled-components';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useRecoilValue } from 'recoil';
import Layout from '../../layout/Layout';
import MilkdownEditor from '../../feature/text-editor/MilkdownEditor';
import { isDarkState } from '../../recoil';

const Section = styled.section`
  width: 100%;
  max-width: var(--breakpoints-desktop);
`;

const QnaFormHeader = styled.div``;

const QnaFormBody = styled.div``;

const QnaFormTitleSection = styled.div``;

const QnaFormQuestionSection = styled.div``;

const QnaFormErrorCodeSection = styled.div``;

const QnaFormTagSection = styled.div``;

const QnaFormFooter = styled.div``;

const QnaFormPage = () => {
  const isDark = useRecoilValue(isDarkState);
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
        <Section>
          <MilkdownEditor width="100%" />
        </Section>
      </Layout>
    </>
  );
};

export default QnaFormPage;
