import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  FEED_PAGE_NAME,
  HOME_PAGE_NAME,
  PROFILE_PAGE_NAME,
  QNA_PAGE_NAME,
  SETTINGS_PAGE_NAME
} from '../constant';
import isDarkState from '../recoil/atoms/isDarkAtom';

const Navigation = () => {
  const [isDark, setIsDark] = useRecoilState(isDarkState);

  const onClickHandler = () => {
    setIsDark((isDarkMode: boolean) => !isDarkMode);
  };

  return (
    <nav>
      <Link to="/">landing</Link>
      <Link to={`/${HOME_PAGE_NAME}`}>home</Link>
      <Link to={`/${QNA_PAGE_NAME}`}>qna</Link>
      <Link to={`/${FEED_PAGE_NAME}`}>feed</Link>
      <Link to={`/${PROFILE_PAGE_NAME}`}>profile</Link>
      <Link to={`/${SETTINGS_PAGE_NAME}`}>settings</Link>
      <button type="button" onClick={onClickHandler}>
        {isDark ? '지금은 다크모드' : '지금은 라이트모드'}
        {`${isDark}`}
      </button>
    </nav>
  );
};

export default Navigation;
