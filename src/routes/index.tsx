import loadable from '@loadable/component';

import QnA from './QnA';
import Feed from './Feed';
import Challenges from './Challenges';
import Roadmap from './Roadmap';

// const QnA = loadable(() => import('./QnA'));
// const Feed = loadable(() => import('./Feed'));
// const Challenges = loadable(() => import('./Challenges'));
// const Roadmap = loadable(() => import('./Roadmap'));

const Error = loadable(() => import('./Error'));
const Home = loadable(() => import('./Home'));
const Bookmark = loadable(() => import('./Bookmark'));
const Profile = loadable(() => import('./Profile'));
const Settings = loadable(() => import('./Settings'));

export { Error, Home, QnA, Feed, Challenges, Roadmap, Bookmark, Profile, Settings };
