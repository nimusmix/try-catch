import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import React from 'react';
import { isDarkState, toastState } from './recoil';
import { darkTheme, lightTheme } from './styles/theme';
import Toast from './feature/toast/Toast';

const GlobalStyles = createGlobalStyle`
  *{
    transition: background-color 0.2s ease-in;
  }
  #root {
    background-color: ${({ theme: { bgColor } }) => bgColor};
    color: ${({ theme: { textColor } }) => textColor};
    min-width: var(--breakpoints-desktop);
    
  }
  
  body {
    background-color: ${({ theme: { bgColor } }) => bgColor};
    overflow-y: scroll;
  }

  body::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  body::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: var(--colors-brand-500); /* 스크롤바의 색상 */

    border-radius: 10px;
  }

  body::-webkit-scrollbar-track {
    background-color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-black-100)' : 'var(--colors-brand-200)'};
  }

  
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

function App() {
  const isDark = useRecoilValue(isDarkState);
  const { isVisible } = useRecoilValue(toastState);
  return (
    <HelmetProvider>
      <Helmet>
        {isDark ? (
          <link href="https://unpkg.com/prism-themes/themes/prism-one-dark.css" rel="stylesheet" />
        ) : (
          <link href="https://unpkg.com/prism-themes/themes/prism-one-light.css" rel="stylesheet" />
        )}
      </Helmet>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          {isVisible && <Toast />}
          <GlobalStyles />
          <Outlet />
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
