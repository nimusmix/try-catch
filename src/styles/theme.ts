import { DefaultTheme } from 'styled-components';

const darkTheme: DefaultTheme = {
  // 전역 설정 컬러
  bgColor: 'var(--colors-black-500)',
  navColor: 'var(--colors-black-400)',
  textColor: 'var(--colors-white-500)',
  textColor300: 'var(--colors-white-300)',
  textColor100: 'var(--colors-white-100)',
  whiteColor: 'var(--colors-white-500)',

  // 시맨틱 컬러
  brandColor: 'var(--colors-brand-500)',
  dangerColor: 'var(--colors-red-500)',
  emphColor: 'var(--colors-emph-500)',
  warnColor: 'var(--colors-orange)',
  successColor: 'var(--colors-success-400)',
};

const lightTheme: DefaultTheme = {
  // 전역 설정 컬러
  bgColor: 'var(--colors-white-500)',
  navColor: 'var(--colors-white-400)',
  textColor: 'var(--colors-black-500)',
  textColor300: 'var(--colors-black-300)',
  textColor100: 'var(--colors-black-100)',
  whiteColor: 'var(--colors-white-500)',

  // 시맨틱 컬러
  brandColor: 'var(--colors-brand-500)',
  dangerColor: 'var(--colors-red-500)',
  emphColor: 'var(--colors-emph-500)',
  warnColor: 'var(--colors-orange)',
  successColor: 'var(--colors-success-800)',
};

export { darkTheme, lightTheme };
