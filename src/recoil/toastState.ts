import { atom } from 'recoil';

interface IToast {
  type: 'positive' | 'negative';
  message: string;
  isVisible: boolean;
}

const toastState = atom<IToast>({
  key: 'toastState',
  default: {
    type: 'positive',
    message: '',
    isVisible: false,
  },
});

export default toastState;
