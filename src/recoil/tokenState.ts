import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const accToken = atom<string>({
  key: 'accToken',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const refToken = atom<string>({
  key: 'refToken',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
