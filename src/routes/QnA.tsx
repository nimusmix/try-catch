import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import QuestionProvider from '../context/QnaContext';

const QnA = () => {
  return (
    <>
      <Helmet>
        <title>트라이캐치 | Q&A</title>
      </Helmet>
      <QuestionProvider>
        <Outlet />
      </QuestionProvider>
    </>
  );
};

export default QnA;
