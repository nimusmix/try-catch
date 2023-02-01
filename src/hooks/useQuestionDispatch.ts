import { useContext } from 'react';
import { QuestionDispatchContext } from '../context/QnaContext';

const useQuestionDispatch = () => {
  const state = useContext(QuestionDispatchContext);
  if (!state) throw new Error('Cannot find QuestionProvider'); // 유효하지 않을땐 에러를 발생
  return state;
};

export default useQuestionDispatch;
