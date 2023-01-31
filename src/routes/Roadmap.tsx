import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Roadmap = () => {
  return (
    <>
      <Helmet>
        <title>트라이캐치 | 로드맵</title>
      </Helmet>
      <Outlet />
    </>
  );
};

export default Roadmap;
