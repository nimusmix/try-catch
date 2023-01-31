import { RefObject, useEffect, useState } from 'react';

type IUseTooltip = [
  boolean,
  boolean,
  (value: ((prevState: boolean) => boolean) | boolean) => void,
  (value: ((prevState: boolean) => boolean) | boolean) => void
];

const useTooltip = (ref: RefObject<any>): IUseTooltip => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isBlur, setIsBlur] = useState<boolean>(false);
  const onFocusHandler = () => {
    setIsFocus(true);
    setIsBlur(false);
  };

  const onBlurHandler = () => {
    setIsBlur(true);
    setIsFocus(false);
  };
  useEffect(() => {
    if (ref?.current) {
      console.log(ref.current);
      ref.current.addEventListener('focusin', onFocusHandler);
      ref.current.addEventListener('focusout', onBlurHandler);
    }
  }, [ref]);

  return [isFocus, isBlur, setIsFocus, setIsBlur];
};

export default useTooltip;
