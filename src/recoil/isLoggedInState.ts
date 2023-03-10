import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'isLoggedIn',
  storage: sessionStorage,
});

const isLoggedInState = atom({
  key: 'isLoggedIn',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export default isLoggedInState;
