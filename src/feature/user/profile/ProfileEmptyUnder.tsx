import styled from 'styled-components';
import AnimationLoader from '../../../components/animation/AnimationLoader';
import noContent from '../../../assets/lottie/qna-no-content.json';
import { Paragraph } from '../../../components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  z-index: 100;
  height: 400px;

  p {
    margin: 1.5rem 0;
  }
`;

const ProfileEmptyUnder = ({ category }: { category: number }) => {
  const msg = ['작성한 질문이', '작성한 답변이', '조회한 피드가'];
  return (
    <Wrapper>
      <Paragraph sizeType="lg" fontWeight="500">
        아직 {msg[category]} 없습니다.
      </Paragraph>
      <AnimationLoader animationData={noContent} autoplay loop />
    </Wrapper>
  );
};

export default ProfileEmptyUnder;
