import React, { Dispatch, SetStateAction } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

interface IModalProps {
  children: React.ReactNode;
  onClose: any;
}

interface IBackDropProps {
  onClose: any;
}

interface IStyledOverlay {
  width?: string;
  height?: string;
  padding?: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const StyledBackdrop = styled.div<IBackDropProps>`
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
  background-color: ${({ theme }) => theme.bgColor};
  width: ${({ width }) => width || '600px'};
  height: ${({ height }) => height || '400px'};
  padding: ${({ padding }) => padding || '1rem'};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: var(--colors-white-100);
  border-radius: var(--borders-radius-lg);
  box-shadow: var(--shadows-black-lg);
  z-index: 1000;
  overflow: hidden;
`;

const Backdrop = ({ onClose }: IBackDropProps) => {
  return <StyledBackdrop onClick={() => onClose(false)} />;
};

const Overlay = ({ children, onClose }: IModalProps) => {
  return <StyledOverlay onClick={() => onClose(false)}>{children}</StyledOverlay>;
};

const Modal = ({ children, onClose }: IModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById('backdrop-root') as HTMLElement
      )}
      {ReactDOM.createPortal(
        <Overlay onClose={onClose}>{children}</Overlay>,
        document.getElementById('overlay-root') as HTMLElement
      )}
    </>
  );
};

export default Modal;
