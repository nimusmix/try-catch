import getAccToken from '../utils/getAccToken';
import tokenDecode from '../utils/tokenDecode';

const UseIsMe = (userId: number) => {
  const acc = getAccToken();

  if (acc) {
    const myId = tokenDecode(acc, 'id');
    return Number(userId) === Number(myId);
  }
  return false;
};

export default UseIsMe;
