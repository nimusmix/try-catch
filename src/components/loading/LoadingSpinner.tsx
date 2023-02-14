import styled from 'styled-components';
import { ReactComponent as Spinner } from './spinner.svg';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 80px;
  height: 80px;
`;
const LoadingSpinner = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
};

export default LoadingSpinner;
