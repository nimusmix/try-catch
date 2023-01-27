const elapsedTime = (time: number) => {
  const written = new Date(time);
  const now = new Date();
  const diff = (Number(now) - Number(written)) / 1000;

  const times = [
    { name: '년', ms: 60 * 60 * 24 * 365 },
    { name: '달', ms: 60 * 60 * 24 * 30 },
    { name: '일', ms: 60 * 60 * 24 },
    { name: '시간', ms: 60 * 60 },
    { name: '분', ms: 60 },
  ];

  // eslint-disable-next-line no-restricted-syntax
  for (const value of times) {
    const rst = Math.floor(diff / value.ms);

    if (rst > 0) {
      return `${rst}${value.name} 전`;
    }
  }

  return '방금 전';
};

export default elapsedTime;
