import loadable from '@loadable/component';

const Error = loadable(() => import('./Error'));
const Home = loadable(() => import('./Home'));
const QnA = loadable(() => import('./QnA'));
const Feed = loadable(() => import('./Feed'));
const Challenges = loadable(() => import('./Challenges'));
const Roadmap = loadable(() => import('./Roadmap'));
const Bookmark = loadable(() => import('./Bookmark'));
const Profile = loadable(() => import('./Profile'));
const Settings = loadable(() => import('./Settings'));

export { Error, Home, QnA, Feed, Challenges, Roadmap, Bookmark, Profile, Settings };
