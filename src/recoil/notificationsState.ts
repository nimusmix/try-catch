import { atom } from 'recoil';

export interface INotification {
  id: number;
  from: number;
  type: 'follow' | 'answerAcceptance' | 'answerRegistration';
  title: string;
  timestamp: number;
}

const notificationsState = atom<Array<INotification>>({
  key: 'notificationsState',
  default: [],
});

export default notificationsState;
