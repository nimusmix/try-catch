import { atom } from 'recoil';
import { INotification } from '../pages/landing/LandingPage';

const notificationsState = atom<Array<INotification>>({
  key: 'notificationsState',
  default: [],
});

export default notificationsState;
