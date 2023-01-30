import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { isDarkState } from './recoil';
import { darkTheme, lightTheme } from './styles/theme';

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
  }
  
  .markdown-preview *{ 
    all : revert;
  }
`;

const queryClient = new QueryClient();

function App() {
  const isDark = useRecoilValue(isDarkState);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Outlet />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
