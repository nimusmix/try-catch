import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom: accPersistAtom } = recoilPersist({
  key: 'accToken',
  storage: sessionStorage,
});

const { persistAtom: refPersistAtom } = recoilPersist({
  key: 'refToken',
  storage: localStorage,
});

export const accToken = atom<string>({
  key: 'accToken',
  default: '',
  effects_UNSTABLE: [accPersistAtom],
});

export const refToken = atom<string>({
  key: 'refToken',
  default: '',
  effects_UNSTABLE: [refPersistAtom],
});
