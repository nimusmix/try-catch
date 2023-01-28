import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  cursor: pointer;
  border-radius: 100px;
  border: none;
  box-shadow: var(--shadows-black-lg);
`;

const TopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
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
      {showButton && (
        <StyledButton onClick={scrollToTop}>
          <svg
            width="50"
            height="50"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 40C0 17.9032 17.9032 0 40 0C62.0968 0 80 17.9032 80 40C80 62.0968 62.0968 80 40 80C17.9032 80 0 62.0968 0 40ZM37.2581 21.629L15.4032 43.4839C13.8871 45 13.8871 47.4516 15.4032 48.9516L18.1452 51.6935C19.6613 53.2097 22.1129 53.2097 23.6129 51.6935L40 35.3064L56.3871 51.6935C57.9032 53.2097 60.3548 53.2097 61.8548 51.6935L64.5968 48.9516C66.1129 47.4355 66.1129 44.9839 64.5968 43.4839L42.7419 21.629C41.2258 20.1129 38.7742 20.1129 37.2581 21.629Z"
              fill="#3B82F6"
            />
          </svg>
        </StyledButton>
      )}
    </div>
  );
};

export default TopButton;
