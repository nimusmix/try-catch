const getAccToken = () => {
  const token = JSON.parse(window.localStorage.getItem('accToken')!);
  console.log(token);
  return token;
};

export default getAccToken;
