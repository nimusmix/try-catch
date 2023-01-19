import styled from 'styled-components';
import { Button, Dropdown, Input, TopButton } from '../../components';
import Layout from '../../layout/Layout';

const Container = styled.div`
  width: 500px;
  margin: auto;
  text-align: center;
`;

const Box = styled.div`
  width: 100%;
  height: 80vh;
  margin: 30px 0;
  background: var(--colors-brand-200);
`;

const Options = [
  { value: 0, text: 'Select...' },
  { value: 1, text: 'Edit' },
  { value: 2, text: 'Mail' },
];

const HomePage = () => {
  return (
    <Layout>
      HomePage
      <Button designType="greenFill">ㅎㅇㅎㅇ버튼임</Button>
      <Container>
        <Input />
        <Dropdown items={Options} width="200px" />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </Container>
      <TopButton />
    </Layout>
  );
};

export default HomePage;
