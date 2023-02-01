import { atom } from 'recoil';

const isLoggedInState = atom({
  key: 'isLoggedIn',
  default: false, // 잠시 수정
});

export default isLoggedInState;
