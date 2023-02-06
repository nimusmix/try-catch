import styled from 'styled-components';
import { useState } from 'react';
import { SettingsBody } from './ThemeSettingsPage';
import { SettingHeader as AdvancedHeader } from '../../feature/settings';
import { Button, Input, MiniTitle, Paragraph } from '../../components';
import SlideButton from '../../components/carousel/SlideButton';
import SlideCheckbox from '../../components/checkbox/SlideCheckbox';

const AdvancedWrapper = styled.div`
  margin: 2rem 0;
  display: flex;
`;

const AdvancedItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AlertItem = styled.div`
  margin-bottom: 0.8rem;
  display: flex;
  width: 400px;
  justify-content: space-between;
`;

const AlertItemList = [
  {
    id: 1,
    label: '멘션',
  },
  {
    id: 2,
    label: '답변',
  },
  {
    id: 3,
    label: '답변 채택',
  },
  {
    id: 4,
    label: '팔로우',
  },
  {
    id: 5,
    label: '구독 블로그 새글 알림',
  },
];
const AdvancedSettingsPage = () => {
  const [checkedItems, setCheckedItems] = useState<Array<number>>([]);

  const handleSingleCheck = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedItems([...checkedItems, id]);
    } else {
      setCheckedItems(checkedItems.filter((el) => el !== id));
    }
  };

  const onSingleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSingleCheck(e.target.checked, Number(e.target.id));
  };

  return (
    <SettingsBody>
      <AdvancedHeader title="고급 기능" />
      <AdvancedWrapper>
        <AdvancedItemWrapper>
          <MiniTitle sizeType="xl" textAlign="left" style={{ marginBottom: '1rem' }}>
            알림 설정
          </MiniTitle>
          {AlertItemList.map((item) => {
            const isChecked = !!checkedItems.includes(item.id);

            return (
              <AlertItem key={item.id}>
                <Paragraph sizeType="lg">{item.label}</Paragraph>
                <SlideCheckbox
                  checked={isChecked}
                  label={String(item.id)}
                  onChange={onSingleCheck}
                />
              </AlertItem>
            );
          })}
        </AdvancedItemWrapper>
      </AdvancedWrapper>
    </SettingsBody>
  );
};

export default AdvancedSettingsPage;
