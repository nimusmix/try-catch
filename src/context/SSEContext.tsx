import React, { createContext, Dispatch, useContext, useEffect, useReducer } from 'react';
import { sseEvents } from '../utils/sse';
import { logOnDev } from '../utils/logging';

// 알람관련 state 타입
// interface IState {}

// 알람관련 액션 타입
// type Action =
//   | { type: 'SET_CATEGORY'; category: string }
//   | { type: 'SET_TITLE'; title: string }
//   | { type: 'SET_CONTENT'; content: string }
//   | { type: 'SET_ERROR_CODE'; errorCode: string }
//   | { type: 'SET_TAGS'; tags: Array<string> }
//   | { type: 'RESET' };

// 디스패치를 위한 타입
export type SSEDispatch = Dispatch<any>;

// const initialState: IState = {
//   category: 'DEV',
//   title: '',
//   content: '',
//   errorCode: '',
//   tags: [],
// };

// context 생성
export const SSEStateContext = createContext<any | null>(null);
export const SSEDispatchContext = createContext<SSEDispatch | null>(null);

const reducer = (state: any, action: any): any => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.category as 'DEV' | 'CAREER' | 'BALANCE',
      };

    default:
      throw new Error(`Unhandled action type`);
  }
};

const SSEProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, null); // null => initialState
  useEffect(() => {
    // message 이벤트
    // 서버로부터 데이터가 오면
    sseEvents.addEventListener('message', (e) => {});

    // 내 질문에 댓글 달림
    sseEvents.addEventListener('comment_my_question', (e) => {
      // const data = JSON.parse(e.data);
      // do something...
    });

    // 커스텀 이벤트 (내 답변 채택)
    sseEvents.addEventListener('selection_my_answer', (e) => {
      // const { liker, post } = JSON.parse(e.data); // 채택한 사람?글?, 그 답변 등등 와야할 정보가 뭘지 생각해보기
      // toast로 답변이 채택된걸 알려주기?
      // 알림만 띄우기?
    });

    // 누군가가 나를 팔로우 했을 때
    sseEvents.addEventListener(`follow_me`, (e) => {
      // const data = JSON.parse(e.data);
      // toast로 답변이 채택된걸 알려주기?
      // 알림만 띄우기?
    });

    // connection 되면
    sseEvents.addEventListener('open', (e) => {
      logOnDev.dir(e);
    });

    // error 발생시
    sseEvents.addEventListener('error', (e) => {
      logOnDev.log(e);
    });

    return () => {
      sseEvents.close();
    };
  }, []);

  return (
    <SSEStateContext.Provider value={state}>
      <SSEDispatchContext.Provider value={dispatch}>{children}</SSEDispatchContext.Provider>
    </SSEStateContext.Provider>
  );
};

export const useSSEState = () => {
  const state = useContext(SSEStateContext);
  if (!state) throw new Error('Cannot find SSEProvider'); // 유효하지 않을땐 에러를 발생
  return state;
};

export const useSSEDispatch = (): any => {
  const state = useContext(SSEDispatchContext);
  if (!state) throw new Error('Cannot find SSEProvider'); // 유효하지 않을땐 에러를 발생
  return state;
};

export default SSEProvider;
