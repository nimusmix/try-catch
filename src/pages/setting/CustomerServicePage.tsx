import { useState } from 'react';
import styled from 'styled-components';
import { Button, Dropdown, Input, MiniTitle, Paragraph } from '../../components';
import { SettingsBody } from './ThemeSettingsPage';
import { SettingHeader as CustomerServiceHeader } from '../../feature/settings';
import { logOnDev } from '../../utils/logging';

const items = [
  { text: '이용문의', value: 'INQUIRY' },
  { text: '오류신고', value: 'ERROR' },
  { text: '서비스 제안', value: 'SERVICE' },
];

const CustomerServiceWrapper = styled.div`
  margin: 2rem 0;
  display: flex;
`;

const CustomerServiceItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CustomerServicePage = () => {
  const [activeCategory, setActiveCategory] = useState('INQUIRY');

  logOnDev.log('active');
  logOnDev.log(activeCategory);
  return (
    <SettingsBody>
      <CustomerServiceHeader title="고객 센터" />
      <CustomerServiceWrapper>
        <CustomerServiceItemWrapper>
          <MiniTitle sizeType="xl" textAlign="left" style={{ marginBottom: '1rem' }}>
            문의 및 버그
          </MiniTitle>
          <Dropdown items={items} changeOption={setActiveCategory} />
          <Paragraph sizeType="base" style={{ margin: '0.5rem 0rem 1rem' }}>
            상황이나 의견을 작성해주세요.
          </Paragraph>
          <Input as="textarea" width="100%" height="200px" style={{ textAlign: 'start' }} />
          <Button margin="1rem 0 0">의견 보내기</Button>
        </CustomerServiceItemWrapper>
      </CustomerServiceWrapper>
    </SettingsBody>
  );
};

export default CustomerServicePage;
