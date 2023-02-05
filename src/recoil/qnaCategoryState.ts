import { atom } from 'recoil';

const qnaCategoryState = atom<string>({
  key: 'qnaCategory',
  default: 'DEV',
});

export default qnaCategoryState;
