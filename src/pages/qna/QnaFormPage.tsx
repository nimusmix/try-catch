import styled from 'styled-components';
import Layout from '../../layout/Layout';
import MilkdownEditor from '../../feature/text-editor/MilkdownEditor';

const Section = styled.section``;
const QnaFormPage = () => {
  return (
    <Layout>
      <MilkdownEditor />
    </Layout>
  );
};

export default QnaFormPage;
