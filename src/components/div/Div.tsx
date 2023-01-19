import styled from 'styled-components';

interface IDivProps {
  children: React.ReactNode;
  onClick?: () => void;
  width?: string;
  height?: string;
  padding?: string;
  bgColor?: string;
  border?: string;
  borderRadius?: string;
}

const StyledDiv = styled.div<Partial<IDivProps>>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding};
  background-color: ${({ bgColor }) => bgColor};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`;

const Div = ({
  children,
  onClick,
  width,
  height,
  padding,
  bgColor,
  border,
  borderRadius,
}: IDivProps) => {
  return (
    <StyledDiv
      onClick={onClick}
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
  onClick: () => {},
  width: '400px',
  height: '400px',
  padding: '2rem',
  bgColor: 'transparent',
  border: '0.8px var(--colors-white-100) solid',
  borderRadius: 'var(--borders-radius-base)',
};

export default Div;
