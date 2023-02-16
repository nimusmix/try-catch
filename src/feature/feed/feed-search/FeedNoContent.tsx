import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useQuery, useQueryClient } from 'react-query';
import AnimationLoader from '../../../components/animation/AnimationLoader';
import noContent from '../../../assets/lottie/qna-no-content.json';
import { MiniTitle, Paragraph } from '../../../components';
import { IFeedList } from '../../../interface/feed';
import tokenDecode from '../../../utils/tokenDecode';
import { isLoggedInState } from '../../../recoil';
import getAccToken from '../../../utils/getAccToken';
import { ISubscription } from '../../../interface/user';
import { getUserSubscription } from '../../../apis/profile/profile';

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
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const acc = getAccToken();
  const userId = isLoggedIn ? tokenDecode(acc!, 'id') : null;

  const { data: subscription } = useQuery<Array<ISubscription>>(
    ['feedSubscription', userId],
    () => getUserSubscription(userId!),
    {
      enabled: !!userId,
    }
  );

  return (
    <Wrapper>
      {/* 키워드가 있지만 결과가 없을 때 */}
      {keyword ? (
        <>
          <MiniTitle sizeType="xl">
            <em>{keyword}</em>에 대한 검색결과가 없어요...
          </MiniTitle>
          <Paragraph sizeType="base" textAlign="center" margin="0 0 3rem 0">
            검색어의 철자가 정확한지 확인해 주세요.
            <br />
            비슷한 다른 검색어를 입력해보세요.
          </Paragraph>
        </>
      ) : null}
      {/* 키워드가 없고 구독한 기술 블로그가 없을 때 */}
      {!keyword && subscription?.length === 0 && (
        <>
          <MiniTitle sizeType="xl">
            <em>구독 중인 기술 블로그</em>가 없어요...
          </MiniTitle>
          <Paragraph sizeType="base" textAlign="center" margin="0 0 3rem 0">
            관심있는 기업의 기술 블로그를 구독해보세요!
          </Paragraph>
        </>
      )}

      <AnimationLoader animationData={noContent} autoplay loop height={460} />
    </Wrapper>
  );
};

export default FeedNoContent;
