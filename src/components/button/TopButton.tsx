import { useEffect, useState } from 'react';
import styled from 'styled-components';
import btnImg from '../../assets/topbutton.svg';

const StyledButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  border-radius: 100px;
  border: none;
  box-shadow: var(--shadows-black-lg);
`;

const TopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  // This function will scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // for smoothly scrolling
    });
  };

  return (
    <div>
      {showButton && (
        <StyledButton onClick={scrollToTop}>
          <img src={btnImg} alt="React Logo" />
        </StyledButton>
      )}
    </div>
  );
};

export default TopButton;
