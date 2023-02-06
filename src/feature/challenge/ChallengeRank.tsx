import styled from 'styled-components';
import { Button, Div, MiniTitle, Paragraph } from '../../components';
import getImageUrl from '../../utils/getImageUrl';

const ChallengeRankWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0.6rem 0rem;
`;

const ProfileImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: var(--borders-radius-round);
`;

const UserName = styled(Paragraph)`
  color: ${({ theme }) => theme.textColor};
`;

const CompanyImg = styled.img`
  width: 20px;
  height: 20px;
  padding: 0.2rem;
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'var(--colors-brand-100)' : 'var(--colors-white-500)'};
  border-radius: var(--borders-radius-base);
  box-shadow: ${({ theme: { isDark } }) =>
    isDark
      ? 'rgba(39, 110, 226, 0.2) 0px 0px 0px 2px, rgba(39, 110, 226, 0.3) 0px 4px 6px -1px, rgba(39, 110, 226, 0.08) 0px 1px 0px inset;'
      : 'rgba(0, 0, 0, 0.16) 0px 1px 4px'};
  translate: 0.5rem;
`;

const FollowButton = styled(Button)``;

const ChallengeRank = () => {
  // 목업 추후 UseQuery로 변경
  // rank 추가해야함
  const MUser = {
    author: {
      username: '42good23423',
      image: 'https://avatars.githubusercontent.com/u/109320569?v=4',
      companyName: 'kakao',
    },
  };

  return (
    <Div width="330px">
      <ul>
        <li>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ChallengeRankWrapper>
              <MiniTitle sizeType="xl" margin="0 1rem 0 0.3rem" color="var(--colors-brand-600)">
                1
              </MiniTitle>
              <ProfileImg src={MUser.author.image} />
              <UserName sizeType="sm" margin="0 0.2rem 0 0.3rem">
                {MUser.author.username}
              </UserName>
              <CompanyImg
                src={
                  MUser.author.companyName && getImageUrl(MUser.author.companyName, 'logo', 'png')
                }
                alt={MUser.author.companyName}
              />
            </ChallengeRankWrapper>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FollowButton fontSize="var(--fonts-body-xm)" style={{ height: 'fit-content' }}>
                팔로우
              </FollowButton>
            </div>
          </div>
        </li>
        <li>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ChallengeRankWrapper>
              <MiniTitle sizeType="xl" margin="0 1rem 0 0.3rem" color="var(--colors-brand-500)">
                2
              </MiniTitle>
              <ProfileImg src={MUser.author.image} />
              <UserName sizeType="sm" margin="0 0.2rem 0 0.3rem">
                {MUser.author.username}
              </UserName>
              <CompanyImg
                src={
                  MUser.author.companyName && getImageUrl(MUser.author.companyName, 'logo', 'png')
                }
                alt={MUser.author.companyName}
              />
            </ChallengeRankWrapper>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FollowButton fontSize="var(--fonts-body-xm)" style={{ height: 'fit-content' }}>
                팔로우
              </FollowButton>
            </div>
          </div>
        </li>
        <li>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ChallengeRankWrapper>
              <MiniTitle sizeType="xl" margin="0 1rem 0 0.3rem" color="var(--colors-brand-500)">
                3
              </MiniTitle>
              <ProfileImg src={MUser.author.image} />
              <UserName sizeType="sm" margin="0 0.2rem 0 0.3rem">
                {MUser.author.username}
              </UserName>
              <CompanyImg
                src={
                  MUser.author.companyName && getImageUrl(MUser.author.companyName, 'logo', 'png')
                }
                alt={MUser.author.companyName}
              />
            </ChallengeRankWrapper>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FollowButton fontSize="var(--fonts-body-xm)" style={{ height: 'fit-content' }}>
                팔로우
              </FollowButton>
            </div>
          </div>
        </li>
      </ul>
    </Div>
  );
};
export default ChallengeRank;
