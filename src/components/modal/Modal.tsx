import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

interface IStyledOverlay {
  children: React.ReactNode;
}

interface IModalProps {
  onClose: (isClose: boolean) => void;
}

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--colors-black-500);
  opacity: 50%;
  z-index: 100;
`;

const StyledOverlay = styled.div<IStyledOverlay>`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'var(--colors-black-300)' : 'var(--colors-white-500)'};
  color: ${({ theme: { textColor } }) => textColor};
  width: 600px;

  height: 400px;
  padding: 1rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: var(--colors-white-100);
  border-radius: var(--borders-radius-lg);
  box-shadow: var(--shadows-black-lg);
  z-index: 1000;
  overflow: hidden;
`;

const Modal = ({ children, onClose }: IStyledOverlay & IModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <StyledBackdrop onClick={() => onClose(false)} />,
        document.getElementById('backdrop-root') as HTMLElement
      )}
      {ReactDOM.createPortal(
        <StyledOverlay>{children}</StyledOverlay>,
        document.getElementById('overlay-root') as HTMLElement
      )}
    </>
  );
};

export default Modal;
