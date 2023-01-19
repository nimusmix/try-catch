import styled from 'styled-components';

interface IDivProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
  padding?: string;
  bgColor?: string;
  border?: string;
  borderRadius?: string;
}

const StyledDiv = styled.div<IDivProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding};
  background-color: ${({ bgColor }) => bgColor};
  border: 0.8px ${({ border }) => border} solid;
  border-radius: ${({ borderRadius }) => borderRadius};
`;

const Div = ({ children, width, height, padding, bgColor, border, borderRadius }: IDivProps) => {
  return (
    <StyledDiv
      width={width}
      height={height}
      padding={padding}
      bgColor={bgColor}
      border={border}
      borderRadius={borderRadius}
    >
      {children}
    </StyledDiv>
  );
};

Div.defaultProps = {
  width: '400px',
  height: '400px',
  padding: '2rem',
  bgColor: 'transparent',
  border: 'var(--colors-white-100)',
  borderRadius: 'var(--borders-radius-base)',
};

export default Div;
