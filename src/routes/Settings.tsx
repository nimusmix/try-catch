import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Settings = () => {
  return (
    <>
      <Helmet>
        <title>트라이캐치 | 설정</title>
      </Helmet>
      <Outlet />
    </>
  );
};

export default Settings;
