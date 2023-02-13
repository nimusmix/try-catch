const getAccToken = () => {
  const accToken = window.localStorage.getItem('accToken');
  console.log(accToken);
  return accToken;
};

export default getAccToken;
