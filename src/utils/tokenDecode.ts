const tokenDecode = (word: string) => {
  const payload = JSON.parse(window.localStorage.getItem('recoil-persist')!).accToken.split('.')[1];
  return JSON.parse(window.atob(payload))[word];
};

export default tokenDecode;
