const shuffle = (arr: Array<string>, count: number) => {
  return [...arr].sort(() => Math.random() - Math.random()).slice(0, count);
};

export default shuffle;
