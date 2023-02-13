const getAccToken = () => {
  const accToken = window.localStorage.getItem('accToken');
  return accToken;
};

export default getAccToken;
