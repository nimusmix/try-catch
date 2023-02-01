import React, { createContext, Dispatch, useContext, useReducer } from 'react';

// state 타입
interface IState {
  category: '개발' | '커리어' | '밸런스 게임';
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
  | { type: 'SET_TAGS'; tags: Array<string> };

// 디스패치를 위한 타입
type QuestionDispatch = Dispatch<Action>;

// context 생성
export const QuestionStateContext = createContext<IState | null>(null);
export const QuestionDispatchContext = createContext<QuestionDispatch | null>(null);

const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.category as '개발' | '커리어' | '밸런스 게임',
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

    default:
      return state;
  }
};

const QuestionProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    category: '개발',
    title: '',
    content: '',
    errorCode: '',
    tags: [],
  });

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
