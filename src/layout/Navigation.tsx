import { Link } from 'react-router-dom';
import {
  FEED_PAGE_NAME,
  HOME_PAGE_NAME,
  PROFILE_PAGE_NAME,
  QNA_PAGE_NAME,
  SETTINGS_PAGE_NAME,
} from '../constant';

const Navigation = () => {
  return (
    <nav>
      <Link to="/">landing</Link>
      <Link to={`/${HOME_PAGE_NAME}`}>home</Link>
      <Link to={`/${QNA_PAGE_NAME}`}>qna</Link>
      <Link to={`/${FEED_PAGE_NAME}`}>feed</Link>
      <Link to={`/${PROFILE_PAGE_NAME}`}>profile</Link>
      <Link to={`/${SETTINGS_PAGE_NAME}`}>settings</Link>
    </nav>
  );
};

export default Navigation;
