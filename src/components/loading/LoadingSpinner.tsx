import styled from 'styled-components';
import { ReactComponent as Spinner } from './spinner.svg';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const LoadingSpinner = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
};

export default LoadingSpinner;
