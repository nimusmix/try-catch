import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import {
  BOOKMARK_PAGE_NAME,
  CHALLENGES_PAGE_NAME,
  FEED_PAGE_NAME,
  HOME_PAGE_NAME,
  PROFILE_PAGE_NAME,
  QNA_PAGE_NAME,
  ROADMAP_PAGE_NAME,
  SETTINGS_PAGE_NAME,
} from './constant';
import {
  AdvancedSettingsPage,
  AlertSettingsPage,
  ChallengesDetailPage,
  ChallengesPage,
  CompanyProfilePage,
  CustomerServicePage,
  EmailAlertSettingsPage,
  FeedPage,
  HomePage,
  IntroducePage,
  LandingPage,
  ProfileEditPage,
  QnaDetailPage,
  QnaFormPage,
  QnaPage,
  RoadmapDetailPage,
  RoadmapListPage,
  RoadmapPage,
  ThemeSettingsPage,
  UserProfilePage,
} from './pages';
import { Bookmark, Challenges, Error, Feed, Home, Profile, QnA, Roadmap, Settings } from './routes';

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
          {
            path: 'form',
            element: <QnaFormPage />,
          },
          {
            path: ':questionId',
            element: <QnaDetailPage />,
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

      // 챌린지
      {
        path: `/${CHALLENGES_PAGE_NAME}`,
        element: <Challenges />,
        children: [
          {
            index: true,
            path: '',
            element: <ChallengesPage />,
          },
          {
            path: ':challengeId',
            element: <ChallengesDetailPage />,
          },
        ],
      },

      // 로드맵
      {
        path: `/${ROADMAP_PAGE_NAME}`,
        element: <Roadmap />,
        children: [
          {
            index: true,
            path: '',
            element: <RoadmapPage />,
          },
          {
            path: 'list',
            element: <RoadmapListPage />,
          },
          {
            path: ':roadmapId',
            element: <RoadmapDetailPage />,
          },
        ],
      },

      // 북마크
      {
        path: `/${BOOKMARK_PAGE_NAME}`,
        element: <Bookmark />,
      },

      // 프로필
      {
        path: `/${PROFILE_PAGE_NAME}`,
        element: <Profile />,
        children: [
          {
            index: true,
            path: ':username',
            element: <UserProfilePage />,
          },
          {
            path: ':companyname',
            element: <CompanyProfilePage />,
          },
          {
            path: 'edit',
            element: <ProfileEditPage />,
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
            path: 'alert',
            element: <AlertSettingsPage />,
          },
          {
            path: 'email-alert',
            element: <EmailAlertSettingsPage />,
          },
          {
            path: 'theme',
            element: <ThemeSettingsPage />,
          },
          {
            path: 'advanced',
            element: <AdvancedSettingsPage />,
          },
          {
            path: 'trycatch',
            element: <IntroducePage />,
          },
          {
            path: 'customer-service',
            element: <CustomerServicePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
