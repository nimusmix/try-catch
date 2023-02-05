import { atom } from 'recoil';

const qnaCategoryState = atom<'DEV' | 'CAREER' | 'BALANCE'>({
  key: 'qnaCategory',
  default: 'DEV',
});

export default qnaCategoryState;
