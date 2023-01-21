import styled from 'styled-components';

interface IDivProps {
  children?: React.ReactNode;
  onClick?: () => void;
  width?: string;
  height?: string;
  padding?: string;
}

export const StyledDiv = styled.div<Partial<IDivProps>>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding || '1rem'};
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  border: 1px ${({ theme }) => theme.borderColor} solid;
  border-radius: 0.75rem;
`;

const Div = ({ children, onClick, width, height, padding }: IDivProps) => {
  return (
    <StyledDiv onClick={onClick} width={width} height={height} padding={padding}>
      {children}
    </StyledDiv>
  );
};

export default Div;
