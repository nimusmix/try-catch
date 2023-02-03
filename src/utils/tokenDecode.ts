const tokenDecode = (token: string, word: string) => {
  const payload = token.split('.')[1];
  return JSON.parse(window.atob(payload))[word];
};

export default tokenDecode;
