import styled from 'styled-components';
import AnimationLoader from '../../../components/animation/AnimationLoader';
import noContent from '../../../assets/lottie/profile-no-content.json';
import { Paragraph } from '../../../components';

const Wrapper = styled.div`
  padding-top: 2rem;
  position: relative;
  width: 100%;
  cursor: pointer;
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'var(--colors-black-300)' : 'var(--colors-white-500)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
  height: 300px;
  cursor: default;

  > div > svg {
    margin-top: 50px;
    height: 80% !important;
  }

  p {
    margin: 0rem 0rem 1.5rem;
  }
`;

const ProfileEmptyUpper = ({ category }: { category: number }) => {
  const msg = ['구독한 기업이', '팔로잉한 유저가', '팔로워가'];
  return (
    <Wrapper>
      <Paragraph sizeType="lg" fontWeight="500">
        아직 {msg[category]} 없습니다.
      </Paragraph>
      <AnimationLoader animationData={noContent} autoplay loop />
    </Wrapper>
  );
};

export default ProfileEmptyUpper;
