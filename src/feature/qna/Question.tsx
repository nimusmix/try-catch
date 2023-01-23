import styled from 'styled-components';
import { RxBookmark, RxBookmarkFilled } from 'react-icons/rx';
import { BsCheckCircleFill, BsShareFill } from 'react-icons/bs';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { Button, Div, MiniTitle, Paragraph } from '../../components';
import elapsedTime from '../../utils/elapsed-time';

interface IQuestion {
  questionId: number;
  author: {
    username: string;
    image?: string;
    company?: string;
  };
  title: string;
  content: string;
  category: string;
  tags: Array<string>;
  likeCount: number;
  answerCount: number;
  timestamp: number;
  isLiked: boolean;
  isSolved: boolean;
  isBookMarked: boolean;
}

const QuestionDiv = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const UpperWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UpperTagWrapper = styled.div`
  display: flex;
`;

const UpperTag = styled(Button)``;

const Icons = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-left: 0.6rem;
    cursor: pointer;
  }
`;

const QuestionInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled(Paragraph)`
  color: ${({ theme }) => theme.textColor100};
`;

const ProfileImg = styled.img`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: var(--borders-radius-round);
`;

const CompanyImg = styled.img`
  width: 14px;
  height: 14px;
  border-radius: 4px;
`;

const Line = styled.div`
  margin-top: 1rem;
  margin-bottom: 1.6rem;
  border-bottom: 0.8px ${({ theme }) => theme.borderColor} solid;
`;

const Like = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.6rem;
  margin-left: auto;
  margin-right: auto;
  svg {
    margin-right: 0.2rem;
    color: ${({ theme }) => theme.textColor100};
  }
  p {
    margin-top: 0.1rem;
  }
`;

const Question = () => {
  // 목업 Question. 추후 UseQuery로 변경하실 것.
  const MQuestion = {
    questionId: 1,
    author: {
      username: '42good',
      image: 'https://avatars.githubusercontent.com/u/109320569?v=4',
      company: 'https://avatars.githubusercontent.com/u/109320569?v=4',
    },
    title: 'react-hook-form 정규표현식 관리 방법',
    content:
      '안녕하세요. react-hook-form을 사용해서 프로젝트를 하고 있습니다. 정규 표현식을 react-hook-form에서 사용할 때 다양한 방법이 있는 것으로 알고 있는데 보통 이것은 목업 데이터입니다.',
    category: '개발',
    tags: ['react', 'react-hook-form'],
    likeCount: 3,
    answerCount: 12,
    timestamp: 174183600,
    isLiked: false,
    isSolved: true,
    isBookMarked: false,
  };

  return (
    <QuestionDiv width="820px" padding="2rem">
      <UpperWrapper>
        <UpperTagWrapper>
          {/* 카테고리 */}
          <UpperTag
            designType="purpleFill"
            fontSize="14px"
            padding="0.2rem 0.6rem"
            borderRadius="10px"
          >
            {MQuestion.category}
          </UpperTag>

          {/* 해결 여부 */}
          {MQuestion.isSolved && (
            <UpperTag
              designType="greenFill"
              fontSize="14px"
              padding="0.2rem 0.6rem"
              margin="0 0 0 0.4rem"
              borderRadius="10px"
            >
              <BsCheckCircleFill size="14" className="solved-icon" />
              &nbsp;Catched
            </UpperTag>
          )}
        </UpperTagWrapper>

        <Icons>
          {/* 북마크 */}
          {MQuestion.isBookMarked && <RxBookmarkFilled size="20" color="var(--colors-brand-500)" />}
          {MQuestion.isBookMarked || <RxBookmark size="20" color="var(--colors-brand-500)" />}

          {/* 공유 */}
          <BsShareFill size="16" color="var(--colors-brand-500)" />
        </Icons>
      </UpperWrapper>

      <MiniTitle sizeType="2xl" textAlign="left" margin="1rem 0 0.6rem 0" fontWeight="600">
        {MQuestion.title}
      </MiniTitle>

      <QuestionInfoWrapper>
        <ProfileImg src={MQuestion.author.image} />
        <Text sizeType="sm" margin="0 0.4rem 0 0.4rem">
          {MQuestion.author.username}
        </Text>
        <CompanyImg src={MQuestion.author.company} />
        <Text sizeType="xm" margin="0 0 0 1rem" color="var(--colors-black-100)">
          {elapsedTime(MQuestion.timestamp)}
        </Text>
      </QuestionInfoWrapper>
      <Line />
      <Text sizeType="base" color="var(--colors-black-100)">
        {MQuestion.content}
      </Text>

      <Like>
        {MQuestion.isLiked && <AiFillLike />}
        {MQuestion.isLiked || <AiOutlineLike />}
        <Text sizeType="xm">{MQuestion.likeCount}</Text>
      </Like>
    </QuestionDiv>
  );
};

export default Question;
