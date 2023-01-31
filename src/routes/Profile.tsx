import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

/*
 * TODO 프로필이 아니라 이름으로 변경할수도
 * */
const Profile = () => {
  return (
    <>
      <Helmet>
        <title>트라이캐치 | 프로필</title>
      </Helmet>
      <Outlet />
    </>
  );
};

export default Profile;
