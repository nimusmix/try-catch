import styled from 'styled-components';

interface IDivProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

const StyledDiv = styled.div<Partial<IDivProps>>`
  width: 400px;
  height: 400px;
  padding: 1rem;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  border-radius: 0.75rem;
`;

const Div = ({ children, onClick }: IDivProps) => {
  return <StyledDiv onClick={onClick}>{children}</StyledDiv>;
};

export default Div;
