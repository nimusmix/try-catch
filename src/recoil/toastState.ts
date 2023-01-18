import { atom } from 'recoil';

const toastState = atom({
  key: 'toastState',
  default: {
    type: 'positive',
    message: '',
    isVisible: false,
  },
});

export default toastState;
