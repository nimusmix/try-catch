import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'isModalOpened',
  storage: localStorage,
});

const isModalOpenedState = atom({
  key: 'isModalOpenedState',
  default: false,
  effects: [persistAtom],
});

export default isModalOpenedState;
