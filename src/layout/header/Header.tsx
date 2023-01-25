import { useEffect } from 'react';
import styled from 'styled-components';
import {
  header_bookmark,
  header_challenge,
  header_feed,
  header_qna,
  header_roadmap,
} from '../../assets';

interface IHeaderProps {
  children: React.ReactNode;
}

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  backdrop-filter: opacity(0.4);
`;

const Header = ({ children }: IHeaderProps) => {
  const preload = (urls: string[]) => {
    urls.forEach((url) => {
      const img = new Image();
      img.src = `${url}`;
    });
  };

  useEffect(() => {
    preload([header_qna, header_feed, header_roadmap, header_challenge, header_bookmark]);
  }, []);
  return <StyledHeader>{children}</StyledHeader>;
};

export default Header;
