import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SettingsLayout } from '../feature/settings';

const Settings = () => {
  return (
    <>
      <Helmet>
        <title>트라이캐치 | 설정</title>
      </Helmet>
      <SettingsLayout>
        <Outlet />
      </SettingsLayout>
    </>
  );
};

export default Settings;
