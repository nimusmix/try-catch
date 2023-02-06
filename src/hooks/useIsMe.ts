import { useRecoilValue } from 'recoil';
import { accToken } from '../recoil';
import tokenDecode from '../utils/tokenDecode';
import { logOnDev } from '../utils/logging';

const UseIsMe = (userId: number) => {
  const acc = useRecoilValue(accToken);
  logOnDev.log(userId);
  if (acc) {
    const myId = tokenDecode(acc, 'id');
    logOnDev.log(myId);

    return userId === myId;
  }
  logOnDev.log(acc);
  return false;
};

export default UseIsMe;
