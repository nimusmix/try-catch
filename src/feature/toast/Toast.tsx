import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { TOAST_TIMEOUT } from '../../constant';
import { toastState } from '../../recoil';
import { logOnDev } from '../../utils/logging';

const ToastWrapper = styled.div`
  padding: 10px 16px;
  background-color: ${({ theme: { isDark } }) => (isDark ? 'var(--colors-black-300)' : '#fdfdfd')};
  color: ${({ theme: { textColor } }) => textColor};
  box-shadow: ${({ theme: { isDark } }) =>
    isDark ? `var(--shadows-brand-md)` : `var(--shadows-black-md)`};
  top: 4rem;
  min-width: 5rem;
  left: 50%;
  translate: -50%;
  z-index: 1100;
  pointer-events: all;
  position: fixed;
  border-radius: 4px;
  animation: slideDown ${TOAST_TIMEOUT}ms forwards, fade-out ${TOAST_TIMEOUT}ms ease-out;

  @keyframes slideDown {
    0%,
    100% {
      -webkit-transform: translateY(-100px);
    }
    10%,
    90% {
      -webkit-transform: translateY(0px);
    }
  }

  @keyframes fade-out {
    88% {
      opacity: 1;
    }
    95% {
      opacity: 0.5;
    }
    100% {
      opacity: 0.1;
    }
  }
`;

const Toast = () => {
  const [toast, setToast] = useRecoilState(toastState);

  logOnDev.log(toast);

  useEffect(() => {
    if (toast.message) {
      setTimeout(() => {
        setToast({ message: '', isVisible: false, type: 'positive' });
      }, TOAST_TIMEOUT);
    }
  }, [toast.message, setToast]);

  return (
    <ToastWrapper>
      {toast.type === 'positive' ? `😁 ${toast.message}` : `😢 ${toast.message}`}
    </ToastWrapper>
  );
};

export default Toast;
