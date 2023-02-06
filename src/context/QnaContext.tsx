import React, { createContext, Dispatch, useContext, useReducer } from 'react';

// state 타입
interface IState {
  category: 'DEV' | 'CAREER' | 'BALANCE';
  title: string;
  content: string;
  errorCode: string;
  tags: Array<string>;
}

// 액션 타입
type Action =
  | { type: 'SET_CATEGORY'; category: string }
  | { type: 'SET_TITLE'; title: string }
  | { type: 'SET_CONTENT'; content: string }
  | { type: 'SET_ERROR_CODE'; errorCode: string }
  | { type: 'SET_TAGS'; tags: Array<string> }
  | { type: 'RESET' };

// 디스패치를 위한 타입
type QuestionDispatch = Dispatch<Action>;

const initialState: IState = {
  category: 'DEV',
  title: '',
  content: '',
  errorCode: '',
  tags: [],
};

// context 생성
export const QuestionStateContext = createContext<IState | null>(null);
export const QuestionDispatchContext = createContext<QuestionDispatch | null>(null);

const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.category as 'DEV' | 'CAREER' | 'BALANCE',
      };
    case 'SET_TITLE':
      return {
        ...state,
        title: action.title,
      };
    case 'SET_CONTENT':
      return {
        ...state,
        content: action.content,
      };
    case 'SET_ERROR_CODE':
      return {
        ...state,
        errorCode: action.errorCode,
      };
    case 'SET_TAGS':
      return {
        ...state,
        tags: [...action.tags],
      };
    case 'RESET':
      return initialState;

    default:
      throw new Error(`Unhandled action type`);
  }
};

const QuestionProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <QuestionStateContext.Provider value={state}>
      <QuestionDispatchContext.Provider value={dispatch}>
        {children}
      </QuestionDispatchContext.Provider>
    </QuestionStateContext.Provider>
  );
};

export const useQuestionState = () => {
  const state = useContext(QuestionStateContext);
  if (!state) throw new Error('Cannot find QuestionProvider'); // 유효하지 않을땐 에러를 발생
  return state;
};

export const useQuestionDispatch = () => {
  const state = useContext(QuestionDispatchContext);
  if (!state) throw new Error('Cannot find QuestionProvider'); // 유효하지 않을땐 에러를 발생
  return state;
};

export default QuestionProvider;
