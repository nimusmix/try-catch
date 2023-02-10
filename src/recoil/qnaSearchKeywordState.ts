import { atom } from 'recoil';

const qnaSearchKeywordState = atom<string>({
  key: 'qnaSearchKeyword',
  default: '',
});

export default qnaSearchKeywordState;
