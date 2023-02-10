import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'systemTheme',
  storage: localStorage,
});

const isSystemTheme =
  localStorage.systemTheme === 'systemTheme' || (!('systemTheme' in localStorage) && false);

const isSystemThemeState = atom({
  key: 'isSystemTheme',
  default: isSystemTheme,
  effects: [persistAtom],
});

export default isSystemThemeState;
