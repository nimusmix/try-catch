import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { IconArrow } from '../icons/Icons';
import { isDarkState } from '../../recoil';

interface ISlideButtonProps {
  direction: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  top?: string;
}

const BtnSlideControl = styled.button<Partial<ISlideButtonProps>>`
  position: absolute;
  top: ${({ top }) => top || 'auto'};
  padding: 1.25rem 0.25rem;
  z-index: 1;
  background-color: ${({ theme }) => theme.bgColor};
  width: 1.875rem;
  /* height: 3.75rem; */
  height: 100%;
  ${({ direction }) =>
    direction === 'prev'
      ? `transform: rotate(180deg);
    left : 0px`
      : 'right: 0px;'};
`;

export default function SlideButton({ direction, onClick, top }: ISlideButtonProps) {
  const isDark = useRecoilValue(isDarkState);
  return (
    <BtnSlideControl onClick={onClick} direction={`${direction}`} top={top}>
      <IconArrow
        color={!isDark ? 'var(--colors-black-500)' : 'var(--colors-white-500)'}
        size="18"
      />
    </BtnSlideControl>
  );
}
