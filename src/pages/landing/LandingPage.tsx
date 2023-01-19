import { useState } from 'react';
import { Button, Checkbox, Div, TopButton } from '../../components';
import SlideCheckbox from '../../components/checkbox/SlideCheckbox';
import Modal from '../../components/modal/Modal';
import TooltipBox from '../../components/tooltip-box/TooltipBox';

import Layout from '../../layout/Layout';

const LandingPage = () => {
  const [checked, setChecked] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <Layout>
      <TooltipBox title="하이" content="굿굿" />
      <div>
        <Checkbox label="123" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        <p>CheckBox is {checked ? '체크됨' : '체크안됨'}</p>
      </div>
      <div>
        <SlideCheckbox
          label="123"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <p>CheckBox is {checked ? '체크됨' : '체크안됨'}</p>
      </div>
      <Button designType="greenFill">ㅎㅇㅎㅇ버튼임</Button>
      <Div>Div임</Div>
      <Button onClick={() => setModalOpened((prev) => !prev)}>모달 버튼</Button>
      {modalOpened && <Modal onClose={setModalOpened}>모달 성공 기원..</Modal>}
      <TopButton />
    </Layout>
  );
};
export default LandingPage;
