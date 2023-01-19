import { useState } from 'react';
import { Button, Checkbox, Div, MiniTitle, Paragraph, SubTitle, Title } from '../../components';
import Modal from '../../components/modal/Modal';
import Layout from '../../layout/Layout';

const LandingPage = () => {
  const [checked, setChecked] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
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
      <div>
        <Checkbox label="123" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        <p>CheckBox is {checked ? '체크됨' : '체크안됨'}</p>
      </div>
      <Button>ㅎㅇㅎㅇ버튼임</Button>
      <Div>Div임</Div>

      <Button onClick={() => setModalOpened((prev) => !prev)}>모달 버튼</Button>
      {modalOpened && <Modal onClose={setModalOpened}>모달 성공 기원..</Modal>}
    </Layout>
  );
};
export default LandingPage;
