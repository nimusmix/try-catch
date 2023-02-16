import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IBookmarkRoadMap } from '../../interface/bookmark';
import { Paragraph, MiniTitle, Button, Card } from '../../components';
import { IconLikeEmpty } from '../../components/icons/Icons';

const ItemWrapper = styled(Card)`
  display: flex;
  align-items: center;
  width: 760px;
  padding: 1.5rem 2rem;
  margin: 1rem 1rem 1rem 2rem;
`;

const Img = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  margin-right: 1.5rem;
`;

const SubText = styled(Paragraph)`
  color: ${({ theme }) => theme.textColor100};
`;

const Line = styled.div`
  width: 544px;
  border-bottom: 1px ${({ theme }) => theme.borderColor} solid;
  margin: 0.5rem 0;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 300px;

  h3 {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0.1rem 0 0.5rem;
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 544px;
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  p {
    margin: 0 0.25rem;
  }
`;

const BookmarkRoadmapItem = ({
  author,
  title,
  tag,
  likeCount,
  createdAt,
  updatedAt,
}: Partial<IBookmarkRoadMap>) => {
  const navigate = useNavigate();

  const goToProfile = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate(`/profile/${author?.userName}`);
  };

  return (
    <ItemWrapper>
      {author?.profileImage ? (
        <Img src={author.profileImage} alt={author.userName} />
      ) : (
        <Img src={new URL(`/src/assets/favicon.ico`, import.meta.url).href} alt="d" />
      )}

      <InfoWrapper>
        <Paragraph sizeType="lg" fontWeight="500" onClick={goToProfile}>
          {author?.userName}
        </Paragraph>

        <SubText sizeType="sm">{author?.companyName}</SubText>
        <Line />

        <MiniTitle sizeType="xl" fontWeight="600">
          {title}
        </MiniTitle>
        <BottomWrapper>
          <Button designType="purpleFill" fontSize="var(--fonts-body-xm)" padding="2.2px 10px">
            {tag}
          </Button>
          <LikeWrapper>
            <IconLikeEmpty size={14} color="var(--colors-black-100)" />
            <Paragraph sizeType="sm">{likeCount}</Paragraph>
          </LikeWrapper>
        </BottomWrapper>
      </InfoWrapper>
    </ItemWrapper>
  );
};

export default BookmarkRoadmapItem;
