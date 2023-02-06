import { MiniTitle } from '../../components';
import { SettingsBody } from './ThemeSettingsPage';
import { SettingHeader as EmailAlertHeader } from '../../feature/settings';

const EmailAlertSettingsPage = () => {
  return (
    <SettingsBody>
      <EmailAlertHeader title="이메일 알람 설정" />
      EmailAlertSettingsPage
    </SettingsBody>
  );
};

export default EmailAlertSettingsPage;
