// API URL
const { VITE_API_URL: API_URL, VITE_SITE_URL: SITE_URL } = import.meta.env;

// route paths
const QNA_PAGE_NAME = 'question';
const FEED_PAGE_NAME = 'feed';
const CHALLENGES_PAGE_NAME = 'challenges';
const ROADMAP_PAGE_NAME = 'roadmap';
const BOOKMARK_PAGE_NAME = 'bookmark';
const PROFILE_PAGE_NAME = 'profile';
const SETTINGS_PAGE_NAME = 'settings';
const ERROR_PAGE_NAME = 'error';

// toast
const TOAST_TIMEOUT = 3000;

// 태그 인피니티 스크롤(랜딩 페이지)
const DURATION = 35000;
const ROWS = 3;
const TAGS_PER_ROW = 8;

const SITE_CARD = new URL(`/src/assets/thumbnail.png`, import.meta.url).href.toString();
const FAVICON = new URL(`/src/assets/favicon.ico`, import.meta.url).href.toString();

export {
  API_URL,
  QNA_PAGE_NAME,
  FEED_PAGE_NAME,
  CHALLENGES_PAGE_NAME,
  ROADMAP_PAGE_NAME,
  BOOKMARK_PAGE_NAME,
  PROFILE_PAGE_NAME,
  SETTINGS_PAGE_NAME,
  ERROR_PAGE_NAME,
  TOAST_TIMEOUT,
  DURATION,
  ROWS,
  TAGS_PER_ROW,
  SITE_URL,
  SITE_CARD,
  FAVICON,
};
