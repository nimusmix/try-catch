import styled from 'styled-components';
import React from 'react';
import Layout from '../../layout/Layout';
import MilkdownEditor from '../../feature/text-editor/MilkdownEditor';

const Section = styled.section`
  width: 100%;
  max-width: var(--breakpoints-desktop);
`;
const QnaFormPage = () => {
  return (
    <Layout>
      <Section>
        <MilkdownEditor width="100%" />
      </Section>
    </Layout>
  );
};

export default QnaFormPage;
