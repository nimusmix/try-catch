import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>트라이캐치 | 홈</title>
      </Helmet>
      <Outlet />
    </>
  );
};

export default Home;
