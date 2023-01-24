import styled from 'styled-components';
import { IoIosArrowForward as ArrowIcon } from 'react-icons/io';
import { useRecoilValue } from 'recoil';
import { isDarkState } from '../../recoil';

interface ISlideButtonProps {
  direction: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const BtnSlideControl = styled.button<Partial<ISlideButtonProps>>`
  position: absolute;
  top: calc(50% - 2.25rem);
  padding: 1.25rem 0.25rem;
  z-index: 1;
  background-color: ${({ theme }) => theme.bgColor};
  width: 1.875rem;
  height: 3.75rem;
  opacity: 0.5;
  ${({ direction }) =>
    direction === 'prev'
      ? `transform: rotate(180deg);
    left : 0px`
      : 'right: 0px;'};
`;

export default function SlideButton({ direction, onClick }: ISlideButtonProps) {
  const isDark = useRecoilValue(isDarkState);
  return (
    <BtnSlideControl onClick={onClick} direction={`${direction}`}>
      <ArrowIcon
        color={!isDark ? 'var(--colors-black-500)' : 'var(--colors-white-500)'}
        size="18"
      />
    </BtnSlideControl>
  );
}
