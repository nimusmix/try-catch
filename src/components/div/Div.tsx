import styled from 'styled-components';

const StyledDiv = styled.div<{
  width?: string;
  height?: string;
  padding?: string;
  bgColor?: string;
  border?: string;
  borderRadius?: string;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding};
  background-color: ${({ bgColor }) => bgColor};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`;

interface IDivProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
  padding?: string;
  bgColor?: string;
  border?: string;
  borderRadius?: string;
}

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
  border: '0.8px var(--colors-white-100) solid',
  borderRadius: 'var(--borders-radius-base)',
};

export default Div;
