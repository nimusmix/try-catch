import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Challenges = () => {
  return (
    <>
      <Helmet>
        <title>트라이캐치 | 챌린지</title>
      </Helmet>
      <Outlet />
    </>
  );
};

export default Challenges;
