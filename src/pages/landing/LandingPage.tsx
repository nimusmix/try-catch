import { MiniTitle, Paragraph, SubTitle, Title } from '../../components';
import Layout from '../../layout/Layout';

const LandingPage = () => {
  return (
    <Layout>
      <Title color="red">123</Title>
      <SubTitle>123</SubTitle>
      <MiniTitle sizeType="3xl" color="red">
        123
      </MiniTitle>
      <MiniTitle sizeType="3xl">123</MiniTitle>
      <MiniTitle sizeType="2xl">123</MiniTitle>
      <MiniTitle sizeType="xl">123</MiniTitle>
      <Paragraph sizeType="lg">123</Paragraph>
      <Paragraph sizeType="base">234</Paragraph>
      <Paragraph sizeType="xm">123</Paragraph>
      <Paragraph sizeType="sm">123</Paragraph>
      <Paragraph as="span" sizeType="sm">
        123
      </Paragraph>
    </Layout>
  );
};
export default LandingPage;
