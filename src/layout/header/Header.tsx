import styled from 'styled-components';

interface IHeaderProps {
  children: React.ReactNode;
}

const StyledHeader = styled.header`
  margin-bottom: 3rem;
`;

const Header = ({ children }: IHeaderProps) => {
  return <StyledHeader>{children}</StyledHeader>;
};

export default Header;
