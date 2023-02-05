import { MiniTitle } from '../../components';
import { SettingsBody } from './ThemeSettingsPage';

const EmailAlertHeader = () => {
  return (
    <MiniTitle sizeType="3xl" textAlign="left">
      이메일 알람 설정
    </MiniTitle>
  );
};

const EmailAlertSettingsPage = () => {
  return (
    <SettingsBody>
      <EmailAlertHeader />
      EmailAlertSettingsPage
    </SettingsBody>
  );
};

export default EmailAlertSettingsPage;
