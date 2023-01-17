import React, { useState } from 'react';
import { Button, Input, Checkbox, Ul, Li, Dropdown } from '../../components';
import Layout from '../../layout/Layout';

const HomePage = () => {
  // const [checked, setChecked] = useState<boolean>(true);

  // const handleCheckboxChange = (event) => {
  //   setChecked(event.target.value);
  // };

  // const onFlip = () => setChecked((current) => !current);

  const [isCheckedA, setIsCheckedA] = useState(false);
  const handleChangeA = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedA(e.target.checked);
  };

  return (
    <Layout>
      HomePage
      <Button
        designType="brand500"
        fontSize="var(--fonts-body-xm)"
        borderRadius="var(--borders-radius-xl)"
      >
        인증코드 발송
      </Button>
      <Button designType="brand400">인증코드 발송</Button>
      <Button designType="cancel">인증코드 발송</Button>
      <Button designType="border">인증코드 발송</Button>
      <Input type="text" placeholder="eg. 10 안녕하세요" margin="16px 0px" />
      <Checkbox handleChange={handleChangeA} isChecked={isCheckedA} label="A" />
      <Ul>
        <Li />
        <Li />
      </Ul>
      <Dropdown />
    </Layout>
  );
};

export default HomePage;
