import styled from 'styled-components';

interface IProgressBar {
  process?: number;
}

const ProgressBarWrapper = styled.div`
  margin: 1rem auto;
  width: 18.75rem;
  text-align: center;
`;

const Progress = styled.div<IProgressBar>`
  width: ${({ process }) => `${process}%` || '0%'};
  background-color: var(--colors-brand-500);
  animation: progressAnimation 2.5s;
  @keyframes progressAnimation {
    0% {
      width: 0%;
      background-color: var(--colors-brand-200);
    }
    100% {
      background-color: var(--colors-brand-500);
    }
  }
`;

const ProgressBarOuter = styled.div`
  padding: 0.25rem;
  border-radius: 1.875rem;
  background: rgba(0, 0, 0, 0.25);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08);
`;

const ProgressBarInner = styled(Progress)`
  height: 1rem;
  border-radius: 1.875rem;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  transition: 0.4s linear;
  transition-property: width, background-color;
`;

const ProgressBar = ({ process }: IProgressBar) => {
  return (
    <ProgressBarWrapper>
      <ProgressBarOuter>
        <ProgressBarInner process={process} />
      </ProgressBarOuter>
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
