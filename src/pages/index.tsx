import loadable from '@loadable/component';

const LandingPage = loadable(() => import('./landing/LandingPage'));
const HomePage = loadable(() => import('./home/HomePage'));
const QnaPage = loadable(() => import('./qna/QnaPage'));
const QnaFormPage = loadable(() => import('./qna/QnaFormPage'));
const QnaDetailPage = loadable(() => import('./qna/QnaDetailPage'));
const FeedPage = loadable(() => import('./feed/FeedPage'));
const ChallengesPage = loadable(() => import('./challenges/ChallengesPage'));
const ChallengesDetailPage = loadable(() => import('./challenges/ChallengesDetailPage'));
const RoadmapPage = loadable(() => import('./roadmap/RoadmapPage'));
const RoadmapListPage = loadable(() => import('./roadmap/RoadmapListPage'));
const RoadmapDetailPage = loadable(() => import('./roadmap/RoadmapDetailPage'));
const UserProfilePage = loadable(() => import('./profile/UserProfilePage'));
const CompanyProfilePage = loadable(() => import('./profile/CompanyProfilePage'));
const ProfileEditPage = loadable(() => import('./profile/ProfileEditPage'));
const AlertSettingsPage = loadable(() => import('./setting/AlertSettingsPage'));
const EmailAlertSettingsPage = loadable(() => import('./setting/EmailAlertSettingsPage'));
const ThemeSettingsPage = loadable(() => import('./setting/ThemeSettingsPage'));
const AdvancedSettingsPage = loadable(() => import('./setting/AdvancedSettingsPage'));
const IntroducePage = loadable(() => import('./setting/IntroducePage'));
const CustomerServicePage = loadable(() => import('./setting/CustomerServicePage'));
const NotFoundPage = loadable(() => import(`./error/NotFoundPage`));

export {
  LandingPage,
  HomePage,
  QnaPage,
  QnaFormPage,
  QnaDetailPage,
  FeedPage,
  ChallengesPage,
  ChallengesDetailPage,
  RoadmapPage,
  RoadmapListPage,
  RoadmapDetailPage,
  UserProfilePage,
  CompanyProfilePage,
  ProfileEditPage,
  AlertSettingsPage,
  EmailAlertSettingsPage,
  ThemeSettingsPage,
  AdvancedSettingsPage,
  IntroducePage,
  CustomerServicePage,
  NotFoundPage,
};
