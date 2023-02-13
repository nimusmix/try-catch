import { useRecoilValue } from 'recoil';
import { accToken } from '../recoil';
import getAccToken from '../utils/getAccToken';
import tokenDecode from '../utils/tokenDecode';

const UseIsMe = (userId: number) => {
  // !!! 토큰 고침 !!!
  // const acc = useRecoilValue(accToken);
  const acc = getAccToken();
  if (acc) {
    const myId = tokenDecode(acc, 'id');
    return Number(userId) === Number(myId);
  }
  return false;
};

export default UseIsMe;
