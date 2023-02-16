import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { ReactComponent as Spinner } from './spinner.svg';
import { isDarkState } from '../../recoil';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 80px;
  height: 80px;
`;
const LoadingSpinner = () => {
  const isDark = useRecoilValue(isDarkState);
  return (
    <Wrapper>
      <Spinner style={{ background: 'transparent' }} />
    </Wrapper>
  );
};

export default LoadingSpinner;
