const isMyself = (myUserName: string, targetUserName: string) => {
  if (myUserName === targetUserName) return true;
  return false;
};

export default isMyself;
