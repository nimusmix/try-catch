import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Feed = () => {
  return (
    <>
      <Helmet>
        <title>트라이캐치 | 피드</title>
      </Helmet>
      <Outlet />
    </>
  );
};

export default Feed;
