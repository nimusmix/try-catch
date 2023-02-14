import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import App from './App';
import {
  BOOKMARK_PAGE_NAME,
  CHALLENGES_PAGE_NAME,
  ERROR_PAGE_NAME,
  FEED_PAGE_NAME,
  PROFILE_PAGE_NAME,
  QNA_PAGE_NAME,
  ROADMAP_PAGE_NAME,
  SETTINGS_PAGE_NAME,
} from './constant';

import {
  ChallengesPage,
  CompanyProfilePage,
  FeedPage,
  FollowersPage,
  FollowingPage,
  GithubSettingsPage,
  LandingPage,
  NotFoundPage,
  ProfileEditPage,
  QnaDetailPage,
  QnaFormPage,
  QnaPage,
  RoadmapDetailPage,
  RoadmapEditPage,
  RoadmapFormPage,
  RoadmapListPage,
  RoadmapPage,
  SubscriptionPage,
  ThemeSettingsPage,
  UserProfilePage,
} from './pages';
import { Bookmark, Challenges, Error, Feed, Profile, QnA, Roadmap, Settings } from './routes';
import ScrollToTop from './components/scroll-to-top/ScrollToTop';

const router = createBrowserRouter([
  {
    // 랜딩 페이지
    path: '/',
    element: (
      <>
        <ScrollToTop />
        <App />
      </>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        path: '',
        element: <LandingPage />,
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
            path: 'form/:questionId',
            element: <QnaFormPage edit />,
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
        ],
      },

      // 로드맵
      {
        path: `/${ROADMAP_PAGE_NAME}`,
        element: <Roadmap />,
        children: [
          {
            path: '',
            element: <RoadmapPage />,
          },
          {
            path: 'form',
            element: <RoadmapFormPage />,
          },
          {
            path: 'list',
            element: <RoadmapListPage />,
          },
          {
            path: 'edit',
            element: <RoadmapEditPage />,
          },
          {
            path: ':userName',
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
            path: ':userName',
            element: <UserProfilePage />,
            children: [
              {
                path: 'subscription',
                element: <SubscriptionPage />,
              },
              {
                path: 'following',
                element: <FollowingPage />,
              },
              {
                path: 'followers',
                element: <FollowersPage />,
              },
            ],
          },
          {
            path: 'company/:companyName',
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
            path: '',
            element: <ThemeSettingsPage />,
          },
          {
            path: 'theme',
            element: <ThemeSettingsPage />,
          },
          {
            path: 'github',
            element: <GithubSettingsPage />,
          },
        ],
      },
      {
        path: `/${ERROR_PAGE_NAME}`,
        element: <Error />,
        children: [
          {
            index: true,
            path: '',
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
