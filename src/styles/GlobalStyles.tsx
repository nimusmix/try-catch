import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle }; // 글로벌 스타일 formatting을 위한 코드

const GlobalStyles = styled.createGlobalStyle`
  :root {
    /* Font Sizes */
    --fonts-desktop-heading-5xl: 3rem;
    --fonts-desktop-heading-4xl: 2.25rem;
    --fonts-desktop-heading-3xl: 1.875rem;
    --fonts-desktop-heading-2xl: 1.5rem;
    --fonts-desktop-heading-xl: 1.25rem;
    --fonts-mobile-heading-4xl: 2.25rem;
    --fonts-mobile-heading-3xl: 1.875rem;
    --fonts-mobile-heading-2xl: 1.5rem;
    --fonts-mobile-heading-xl: 1.25rem;
    --fonts-body-lg: 1.125rem;
    --fonts-body-base: 1rem;
    --fonts-body-sm: 0.875rem;
    --fonts-body-xm: 0.75rem;

    /* line Heights */
    --lineHights-desktop-heading-5xl: 3rem;
    --lineHights-desktop-heading-4xl: 2.5rem;
    --lineHights-desktop-heading-3xl: 2.25rem;
    --lineHights-desktop-heading-2xl: 2rem;
    --lineHights-desktop-heading-xl: 1.75rem;
    --lineHights-mobile-heading-4xl: 2.5rem;
    --lineHights-mobile-heading-3xl: 2.25rem;
    --lineHights-mobile-heading-2xl: 2rem;
    --lineHights-mobile-heading-xl: 1.75rem;
    --lineHights-body-lg: 1.75rem;
    --lineHights-body-base: 1.5rem;
    --lineHights-body-sm: 1.25rem;
    --lineHights-body-xm: 1rem;

    /* Colors */
    --colors-brand-600: #276ee2;
    --colors-brand-500: #3b82f6;
    --colors-brand-400: #d6e4fb;
    --colors-brand-300: #e9f0fc;
    --colors-black-500: #0f172a;
    --colors-black-400: #232b3e;
    --colors-black-300: #373f52;
    --colors-black-200: #4b5366;
    --colors-black-100: #5f677a;
    --colors-white-500: #fcfcfc;
    --colors-white-400: #e9e9e9;
    --colors-white-300: #d5d5d5;
    --colors-white-200: #c1c1c1;
    --colors-white-100: #adadad;
    --colors-success-darkMode: #4fff65;
    --colors-success-lightMode: #13ce29;
    --colors-yellow: #ffff4f;
    --colors-orange: #f6af3b;
    --colors-red-500: #f85149;
    --colors-red-600: #e43d35;
    --colors-red-700: #d02921;
    --colors-emph-200: #bc77ff;
    --colors-emph-500: #803bf6;

    /* Breakpoints */
    --breakpoints-mobile: 320px;
    --breakpoints-tablet: 768px;
    --breakpoints-desktop: 1200px;
    --sui-breakpoints-widescreen: 1920px;

    /* Borders */
    --borders-radius-base: 8px;
    --borders-radius-lg: 12px;
    --borders-radius-xl: 16px;
    --borders-radius-2xl: 24px;
    --borders-radius-round: 50%;

    /* Shadows */
    --shadows-black-sm: 0px 1px 2px rgba(0, 0, 0, 0.05);
    --shadows-black: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
    --shadows-black-md: 0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadows-black-lg: 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadows-black-xl: 0px 20px 25px -5px rgba(0, 0, 0, 0.1),
      0px 10px 10px -5px rgba(0, 0, 0, 0.04);
    --shadows-black-2xl: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);

    --shadows-brand-sm: 0px 1px 2px rgba(59, 130, 246, 0.05);
    --shadows-brand: 0px 1px 3px rgba(59, 130, 246, 0.1), 0px 1px 2px rgba(59, 130, 246, 0.06);
    --shadows-brand-md: 0px 4px 6px -1px rgba(59, 130, 246, 0.1),
      0px 2px 4px -1px rgba(59, 130, 246, 0.06);
    --shadows-brand-lg: 0px 10px 15px -3px rgba(59, 130, 246, 0.1),
      0px 4px 6px -2px rgba(59, 130, 246, 0.05);
    --shadows-brand-xl: 0px 20px 25px -5px rgba(59, 130, 246, 0.1),
      0px 10px 10px -5px rgba(59, 130, 246, 0.04);
    --shadows-brand-2xl: 0px 25px 50px -12px rgba(59, 130, 246, 0.25);
    /* --minus-margin-android: 0px -16px;
  --minus-margin-ios: 0px -24px;
  --minus-margin-undefined: 0px -24px;
  --padding-android: 0px 16px;
  --padding-ios: 0px 24px;
  --padding-undefined: 0px 24px; */
  }

  /* css reset*/
  *,
  ::before,
  ::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: theme('borderColor.DEFAULT', 'currentColor');
  }
  ::before,
  ::after {
    --tw-content: '';
  }
  html {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    -moz-tab-size: 4;
    tab-size: 4;
    font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
      Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic',
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  }
  body {
    margin: 0;
    line-height: inherit;
  }
  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }
  abbr:where([title]) {
    text-decoration: underline dotted;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-weight: inherit;
  }
  a {
    color: inherit;
    text-decoration: inherit;
  }
  b,
  strong {
    font-weight: bolder;
  }
  code,
  kbd,
  samp,
  pre {
    font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
      Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic',
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
    font-size: 1em;
  }
  small {
    font-size: 80%;
  }
  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: inherit;
    color: inherit;
    margin: 0;
    padding: 0;
  }
  button,
  select {
    text-transform: none;
  }
  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button;
    background-color: transparent;
    background-image: none;
  }
  :-moz-focusring {
    outline: auto;
  }
  :-moz-ui-invalid {
    box-shadow: none;
  }
  progress {
    vertical-align: baseline;
  }
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    height: auto;
  }
  [type='search'] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }
  summary {
    display: list-item;
  }
  blockquote,
  dl,
  dd,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  figure,
  p,
  pre {
    margin: 0;
  }
  fieldset {
    margin: 0;
    padding: 0;
  }
  legend {
    padding: 0;
  }
  ol,
  ul,
  menu {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  textarea {
    resize: vertical;
  }
  input::placeholder,
  textarea::placeholder {
    opacity: 1;
    color: theme('colors.gray.400', #9ca3af);
  }
  button,
  [role='button'] {
    cursor: pointer;
  }
  :disabled {
    cursor: default;
  }
  img,
  svg,
  video,
  canvas,
  audio,
  iframe,
  embed,
  object {
    display: block;
    vertical-align: middle;
  }
  img,
  video {
    max-width: 100%;
    height: auto;
  }
  [hidden] {
    display: none;
  }
`;

export default GlobalStyles;
