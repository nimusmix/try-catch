import styled from 'styled-components';

const StyledDiv = styled.div<{
  width?: string;
  height?: string;
  padding?: string;
  bgColor?: string;
  border?: string;
  borderRadius?: string;
  zIndex?: number;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding};
  background-color: ${({ bgColor }) => bgColor};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  z-index: ${({ zIndex }) => zIndex};
`;

interface IDivProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
  padding?: string;
  bgColor?: string;
  border?: string;
  borderRadius?: string;
  zIndex?: number;
}

const Div = ({
  children,
  width,
  height,
  padding,
  bgColor,
  border,
  borderRadius,
  zIndex,
}: IDivProps) => {
  return (
    <StyledDiv
      width={width}
      height={height}
      padding={padding}
      bgColor={bgColor}
      border={border}
      borderRadius={borderRadius}
      zIndex={zIndex}
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
  zIndex: 'default',
};

export default Div;
