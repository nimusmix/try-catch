import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'theme',
  storage: localStorage,
});

const isDark =
  localStorage.theme === 'dark' ||
  (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

const isDarkState = atom({
  key: 'isDark',
  default: isDark,
  effects: [persistAtom],
});

export default isDarkState;
