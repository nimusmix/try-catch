import { useContext } from 'react';
import { QuestionStateContext } from '../context/QnaContext';

const useQuestionState = () => {
  const state = useContext(QuestionStateContext);
  if (!state) throw new Error('Cannot find QuestionProvider'); // 유효하지 않을땐 에러를 발생
  return state;
};

export default useQuestionState;
