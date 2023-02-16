import { atom } from 'recoil';

const qnaPageTopState = atom<number>({
  key: 'qnaPageTopState',
  default: 180,
});

export default qnaPageTopState;
