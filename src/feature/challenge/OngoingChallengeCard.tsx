import styled, { keyframes } from 'styled-components';

export interface IOngoingChallengeCardProps {
  progress: number;
  progressCircle: number;
}

const Skill = styled.div`
  width: 160px;
  height: 160px;
  position: relative;
  margin: auto;

  svg {
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(-90deg);
  }
`;

const Outer = styled.div`
  height: 160px;
  width: 160px;
  padding: 20px;
  box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.15), -6px -6px 10px -1px rgba(255, 255, 255, 0.7);
  border-radius: 50%;
`;

const Inner = styled.div`
  height: 120px;
  width: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2),
    inset -4px -4px 6px -1px rgba(255, 255, 255, 0.7), -0.5px -0.5px 0px rgba(255, 255, 255, 1),
    0.5px 0.5px 0px rgba(0, 0, 0, 0.15), 0px 12px 10px -10px rgba(0, 0, 0, 0.05);
`;
const anim = (progressCircle: number) => keyframes`
    100% {
      stroke-dashoffset:  ${progressCircle};
    }
`;

const Circle = styled.circle<Partial<IOngoingChallengeCardProps>>`
  fill: none;
  stroke: url(#GradientColor);
  stroke-width: 20px;
  stroke-dasharray: 450;
  stroke-dashoffset: 450;
`;

const ProgressNum = styled.div`
  font-weight: 600;
  color: #555;
  font-size: 30px;
`;

const OngoingChallengeCard = ({ progress }: Partial<IOngoingChallengeCardProps>) => {
  const number = document.getElementById('number');

  const progressCircle = progress ? 450 * (1 - progress * 0.01) : 157.5;

  return (
    <Skill>
      <Outer>
        <Inner>
          <ProgressNum id="number">{progress}%</ProgressNum>
        </Inner>
      </Outer>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
        <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stopColor="#DA22FF" />
            <stop offset="100%" stopColor="#9733EE" />
          </linearGradient>
        </defs>

        <Circle cx="80" cy="80" r="70" strokeLinecap="round" progressCircle={progressCircle} />
      </svg>
    </Skill>
  );
};

export default OngoingChallengeCard;
