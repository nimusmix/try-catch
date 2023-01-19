import styled from 'styled-components';

interface IHeaderProps {
  children: React.ReactNode;
}

const StyledHeader = styled.header`
  position: relative;
  z-index: 10;
`;

const Header = ({ children }: IHeaderProps) => {
  return <StyledHeader>{children}</StyledHeader>;
};

export default Header;
