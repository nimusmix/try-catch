import styled from 'styled-components';

interface IDivProps {
  children?: React.ReactNode;
  onClick?: () => void;
  width?: string;
  height?: string;
  padding?: string;
}

const Div = styled.div<Partial<IDivProps>>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding || '1rem'};
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  border: 1px ${({ theme }) => theme.borderColor} solid;
  border-radius: 0.75rem;
`;

export default Div;
