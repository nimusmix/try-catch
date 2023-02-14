import styled from 'styled-components';
import AnimationLoader from '../../components/animation/AnimationLoader';
import noContent from '../../assets/lottie/qna-no-content.json';
import { MiniTitle, Paragraph } from '../../components';
import { IFeedList } from '../../interface/feed';

const Wrapper = styled.article`
  padding-top: 2rem;
  position: relative;
  width: 100%;
  height: 80%;
  z-index: 1000;
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'var(--colors-black-500)' : 'var(--colors-white-500)'};

  h3 {
    margin-bottom: 0.2rem;
    em {
      color: var(--colors-brand-500);
      margin-right: 0.5rem;
      text-transform: capitalize;
    }
  }
`;

const FeedNoContent = ({ keyword }: Partial<IFeedList>) => {
  return (
    <Wrapper>
      <MiniTitle sizeType="xl">
        <em>{keyword}</em>에 대한 검색결과가 없어요...
      </MiniTitle>
      <Paragraph sizeType="base" textAlign="center" margin="0 0 3rem 0">
        검색어의 철자가 정확한지 확인해 주세요.
        <br />
        비슷한 다른 검색어를 입력해보세요.
      </Paragraph>

      <AnimationLoader animationData={noContent} autoplay loop height={460} />
    </Wrapper>
  );
};

export default FeedNoContent;
