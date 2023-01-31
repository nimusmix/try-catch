import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const QnA = () => {
  return (
    <>
      <Helmet>
        <title>트라이캐치 | Q&A</title>
      </Helmet>
      <Outlet />
    </>
  );
};

export default QnA;
