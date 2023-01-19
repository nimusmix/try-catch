import styled from 'styled-components';
import MiniTitle from '../font/MiniTitle';
import Paragraph from '../font/Paragraph';

interface ITooltipBoxProps {
  title: string;
  content: string;
}

const StyledTooltipBox = styled.div`
  position: relative;
  background-color: var(--colors-brand-100);
  padding: 2rem 2.5rem;
  width: 400px;
  margin-left: 100px;
  border-radius: var(--borders-radius-base);
  box-shadow: ${({ theme }) =>
    theme.isDark ? 'var(--shadows-brand-md)' : 'var(--shadows-black-md)'};
  filter: drop-shadow(rgba(0, 0, 0, 0.1) 0 2px 10px);
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-right-color: var(--colors-brand-100);
    border-left: 0;
    border-top: 0;
    margin-top: -10px;
    margin-left: -20px;
  }
`;

const TooltipBox = ({ title, content }: ITooltipBoxProps) => {
  return (
    <StyledTooltipBox>
      <MiniTitle
        sizeType="xl"
        color="var(--colors-black-200)"
        textAlign="left"
        margin="0 0 0.5rem 0"
      >
        {title}
      </MiniTitle>
      <Paragraph sizeType="base" color="var(--colors-black-100)">
        {content}
      </Paragraph>
    </StyledTooltipBox>
  );
};

export default TooltipBox;
