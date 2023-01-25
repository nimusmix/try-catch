import styled from 'styled-components';
import { Button, Dropdown, Input, Slideshow, TopButton } from '../../components';
import Layout from '../../layout/Layout';

const Container = styled.div`
  width: 500px;
  margin: auto;
  text-align: center;
  background-color: ${({ theme: { bgColor } }) => bgColor};
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
      <Slideshow />
      <Container>
        <Input placeholder="Search..." />
        <Input
          placeholder="제목을 입력하세요..."
          borderRadius="none"
          border="none; border-bottom:1px solid;"
          boxShadow="none"
        />
        <Dropdown items={Options} width="150px" />
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
