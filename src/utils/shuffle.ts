import { TAGS_PER_ROW } from '../constant';

const shuffle = (arr: Array<string>) => {
  return [...arr].sort(() => Math.random() - Math.random()).slice(0, TAGS_PER_ROW);
};

export default shuffle;
