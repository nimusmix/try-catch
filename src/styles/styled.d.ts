import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    // 전역 설정 컬러
    bgColor: string;
    navColor: string;
    textColor: string;
    textColor300: string;
    textColor100: string;
    borderColor: string;
    boxShadowLarge: string;

    // 시맨틱 컬러
    brandColor: string;
    dangerColor: string;
    emphColor: string;
    warnColor: string;
    successColor: string;
    whiteColor: string;

    isDark: boolean;
  }
}
