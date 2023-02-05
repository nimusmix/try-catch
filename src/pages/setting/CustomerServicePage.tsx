import { useState } from 'react';
import { Dropdown } from '../../components';
import { SettingsBody } from './ThemeSettingsPage';

const Exitems = [
  { text: '개발', value: 'DEV' },
  { text: '커리어', value: 'CAREER' },
];
const CustomerServicePage = () => {
  const [activeCategory, setActiveCategory] = useState('DEV');

  console.log('active');
  console.log(activeCategory);
  return (
    <SettingsBody>
      CustomerServicePage
      <Dropdown items={Exitems} changeOption={setActiveCategory} />
    </SettingsBody>
  );
};

export default CustomerServicePage;
