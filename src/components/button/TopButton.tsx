import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IconArrowUp } from '../icons/Icons';

const StyledButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  border-radius: var(--borders-radius-round);
  border: 1px solid transparent;
  width: 50px;
  height: 50px;
  padding: 0;
  background: var(--colors-brand-500);
  color: var(--colors-brand-100);
  font-size: 22px;
  line-height: 0;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(100px);

  &.scrolled {
    transform: translateY(0);
  }
`;

const TopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  // // 1. timeout을 줘서 스크롤이 끝난 후 작동하게 하는 방법
  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // for smoothly scrolling
      });
    }, 300);
  };

  /**
   * TODO 나중에 고쳐볼것
   */
  // // 2. IntersectionObserver 사용
  // const scrollToTop = () => {
  //   setTimeout(() => {
  //     window.scrollTo({
  //       top: 0,
  //       behavior: 'smooth', // for smoothly scrolling
  //     });
  //   }, 350);
  // };

  return (
    <div>
      <StyledButton onClick={scrollToTop} className={showButton ? 'scrolled' : ''}>
        <IconArrowUp />
      </StyledButton>
    </div>
  );
};

export default TopButton;
