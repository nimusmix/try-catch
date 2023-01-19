import { atom } from 'recoil';

const isLoggedInState = atom({
  key: 'isLoggedIn',
  default: true,
});

export default isLoggedInState;
