import { atom } from 'recoil';

const isMobileState = atom<boolean>({
  key: 'isMobileState',
  default: false,
});

export default isMobileState;
