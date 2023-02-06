import { useRecoilValue } from 'recoil';
import { accToken } from '../recoil';
import tokenDecode from '../utils/tokenDecode';

const UseIsMe = (userId: number) => {
  const acc = useRecoilValue(accToken);
  if (acc) {
    const myId = tokenDecode(acc, 'id');
    return Number(userId) === Number(myId);
  }
  return false;
};

export default UseIsMe;
