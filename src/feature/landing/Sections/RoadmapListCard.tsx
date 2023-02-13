import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { IconLikeEmpty } from '../../../components/icons/Icons';
import { Button, Div, MiniTitle, Paragraph } from '../../../components';
import { isDarkState } from '../../../recoil';

interface IRoadmapItemProps {
  roadmapId: number;
  author: {
    userId: number;
    userName: string;
    profileImage?: string;
    companyName?: string;
    isFollowed: boolean;
  };
  title: string;
  tag: string;
  isBookmarked: boolean;
  isLiked: boolean;
  likeCount: number;
  createdAt: number;
  updatedAt: number;
}

const ItemWrapper = styled(Div)`
  display: flex;
  align-items: center;
  margin: 0.5rem;

  &:hover {
    transition: box-shadow 0.5s ease, translate 0.5s ease;
    box-shadow: ${({ theme: { isDark } }) =>
      isDark
        ? 'rgba(59, 130, 246, 0.16) 0px 3px 6px, rgba(59, 130, 246, 0.23) 0px 3px 6px'
        : 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'};
    translate: 1px 1px;
  }
`;

const Img = styled.img`
  width: 112px;
  height: 112px;
  border-radius: 50%;
  margin-right: 1.5rem;
`;

const SubText = styled(Paragraph)`
  color: ${({ theme }) => theme.textColor100};
`;

const Line = styled.div`
  width: 100%;
  border-bottom: 1px ${({ theme }) => theme.borderColor} solid;
  margin: 0.5rem 0;
`;

const InfoWrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h3 {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0.1rem 0 0.5rem;
  }
`;

const BottomWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  p {
    margin: 0 0.25rem;
  }
`;

const RoadmapListCard = ({ roadmap }: { roadmap: IRoadmapItemProps }) => {
  const isDark = useRecoilValue(isDarkState);

  return (
    <ItemWrapper>
      <span>
        {roadmap.author.profileImage ? (
          <Img src={roadmap.author.profileImage} alt={roadmap.author.userName} />
        ) : (
          <Img src={new URL(`/src/assets/favicon.ico`, import.meta.url).href} alt="d" />
        )}
      </span>

      <InfoWrapper>
        <Paragraph sizeType="lg" fontWeight="500">
          {roadmap.author.userName}
        </Paragraph>
        <SubText sizeType="sm">{roadmap.author.companyName || '지니가던 개발자'}</SubText>
        <Line />
        <MiniTitle sizeType="xl" fontWeight="600">
          {roadmap.title}
        </MiniTitle>

        <BottomWrapper>
          <Button designType="purpleFill" fontSize="var(--fonts-body-xm)" padding="2.2px 10px">
            {roadmap.tag}
          </Button>

          <LikeWrapper>
            <IconLikeEmpty
              size={14}
              color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
            />
            <Paragraph sizeType="sm">{roadmap.likeCount}</Paragraph>
          </LikeWrapper>
        </BottomWrapper>
      </InfoWrapper>
    </ItemWrapper>
  );
};

export default RoadmapListCard;
