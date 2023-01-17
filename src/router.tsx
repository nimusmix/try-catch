import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import {
  FEED_PAGE_NAME,
  HOME_PAGE_NAME,
  PROFILE_PAGE_NAME,
  QNA_PAGE_NAME,
  SETTINGS_PAGE_NAME,
} from './constant';
import { FeedPage, HomePage, LandingPage, ProfilePage, QnaPage, SettingPage } from './pages';
import { Error, Feed, Home, QnA, Settings } from './routes';
import Profile from './routes/Profile';

const router = createBrowserRouter([
  {
    // 랜딩 페이지
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        path: '',
        element: <LandingPage />,
      },
    ],
  },

  // 홈
  {
    path: `/${HOME_PAGE_NAME}`,
    element: <Home />,
    children: [
      {
        index: true,
        path: '',
        element: <HomePage />,
      },
    ],
  },

  // 피드
  {
    path: `/${FEED_PAGE_NAME}`,
    element: <Feed />,
    children: [
      {
        index: true,
        path: '',
        element: <FeedPage />,
      },
    ],
  },

  // 마이페이지
  {
    path: `/${PROFILE_PAGE_NAME}`,
    element: <Profile />,
    children: [
      {
        index: true,
        path: '',
        element: <ProfilePage />,
      },
    ],
  },

  // Q&A
  {
    path: `/${QNA_PAGE_NAME}`,
    element: <QnA />,
    children: [
      {
        index: true,
        path: '',
        element: <QnaPage />,
      },
    ],
  },

  // 설정
  {
    path: `/${SETTINGS_PAGE_NAME}`,
    element: <Settings />,
    children: [
      {
        index: true,
        path: '',
        element: <SettingPage />,
      },
    ],
  },
]);

export default router;
