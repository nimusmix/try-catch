import loadable from '@loadable/component';

import LandingPage from './landing/LandingPage';
import QnaPage from './qna/QnaPage';
import RoadmapPage from './roadmap/RoadmapPage';

// const LandingPage = loadable(() => import('./landing/LandingPage'));
// const HomePage = loadable(() => import('./home/HomePage'));
// const QnaPage = loadable(() => import('./qna/QnaPage'));
const FeedPage = loadable(() => import('./feed/FeedPage'));
const ChallengesPage = loadable(() => import('./challenges/ChallengesPage'));

// const RoadmapPage = loadable(() => import('./roadmap/RoadmapPage'));
const QnaFormPage = loadable(() => import('./qna/QnaFormPage'));
const QnaDetailPage = loadable(() => import('./qna/QnaDetailPage'));
const RoadmapFormPage = loadable(() => import('./roadmap/RoadmapFormPage'));
const RoadmapListPage = loadable(() => import('./roadmap/RoadmapListPage'));
const RoadmapDetailPage = loadable(() => import('./roadmap/RoadmapDetailPage'));
const RoadmapEditPage = loadable(() => import('./roadmap/RoadmapEditPage'));
const UserProfilePage = loadable(() => import('./profile/UserProfilePage'));
const CompanyProfilePage = loadable(() => import('./profile/CompanyProfilePage'));
const ProfileEditPage = loadable(() => import('./profile/ProfileEditPage'));
const ThemeSettingsPage = loadable(() => import('./setting/ThemeSettingsPage'));
const GithubSettingsPage = loadable(() => import('./setting/GithubSettingsPage'));
const NotFoundPage = loadable(() => import(`./error/NotFoundPage`));
const SubscriptionPage = loadable(() => import('./profile/SubscriptionPage'));
const FollowingPage = loadable(() => import('./profile/FollowingPage'));
const FollowersPage = loadable(() => import('./profile/FollowersPage'));

export {
  LandingPage,
  QnaPage,
  QnaFormPage,
  QnaDetailPage,
  FeedPage,
  ChallengesPage,
  RoadmapPage,
  RoadmapFormPage,
  RoadmapListPage,
  RoadmapDetailPage,
  RoadmapEditPage,
  UserProfilePage,
  CompanyProfilePage,
  ProfileEditPage,
  ThemeSettingsPage,
  GithubSettingsPage,
  NotFoundPage,
  SubscriptionPage,
  FollowingPage,
  FollowersPage,
};
