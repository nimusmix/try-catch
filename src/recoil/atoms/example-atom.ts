import { atom } from 'recoil';

const exampleState = atom({
  key: 'example',
  default: '예시',
});

export default exampleState;
