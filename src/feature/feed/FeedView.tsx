import styled from 'styled-components';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { IconCard, IconList } from '../../components/icons/Icons';
import isMobileState from '../../recoil/isMobileState';
import useWindowSize from '../../hooks/useWindowSize';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.button`
  margin: 0 0 0 0.1rem;
  padding: 0.3rem;
  cursor: pointer;
  border-radius: 6px;
  :hover {
    background: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-black-400)' : 'var(--colors-white-400)'};
  }
`;

interface FeedViewProps {
  setActiveViewOption: Dispatch<SetStateAction<boolean>>;
}

const FeedView = ({ setActiveViewOption }: FeedViewProps) => {
  const [windowWidth, windowHeight] = useWindowSize();
  const isMobile = useRecoilValue(isMobileState);

  useEffect(() => {
    if (windowWidth > 0 && windowWidth < 600) {
      setActiveViewOption(false);
    }
  }, [windowWidth, setActiveViewOption]);

  useEffect(() => {
    if (isMobile) setActiveViewOption(true);
  }, [isMobile, setActiveViewOption]);

  return (
    <Wrapper>
      <IconWrapper onClick={() => setActiveViewOption(true)}>
        <IconCard size="16" />
      </IconWrapper>
      <IconWrapper onClick={() => setActiveViewOption(false)}>
        <IconList size="16" />
      </IconWrapper>
    </Wrapper>
  );
};

export default FeedView;
