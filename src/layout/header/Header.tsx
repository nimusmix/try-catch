import { useEffect } from 'react';
import styled from 'styled-components';
import {
  header_qna,
  header_feed,
  header_roadmap,
  header_challenge,
  header_bookmark,
} from '../../assets';

interface IHeaderProps {
  children: React.ReactNode;
}

const StyledHeader = styled.header`
  position: relative;
  z-index: 10;
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
