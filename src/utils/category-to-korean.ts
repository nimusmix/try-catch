const categoryToKorean = (category: string | undefined) => {
  if (category === 'DEV') {
    return '개발';
  }
  if (category === 'BALANCE') {
    return '밸런스 게임';
  }
  return '커리어';
};

export default categoryToKorean;
