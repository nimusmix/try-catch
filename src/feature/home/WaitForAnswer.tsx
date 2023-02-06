import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HomeSectionTitle from './HomeSectionTitle';
import QuestionItem from './WaitQuestionItem';

const WaitForAnswerWrapper = styled.div`
  width: 500px;
  margin: 0 2rem 0 0;
  padding: 0 0 0 2rem;

  li:first-child {
    border-top: 1px solid ${({ theme }) => theme.borderColor};
  }
`;

const questionList = [
  {
    questionId: 1,
    category: 'DEV',
    title: 'react-hook-form 정규표현식 관리방법',
    content:
      '안녕하세요. react-hook-form을 사용해서 프로젝트를 하고 있습니다. 정규 표현식을\n' +
      'react-hook-form에서 사용할 때 다양한 방법이 있는 것으로 알고 있는데 보통 보통...',
    timestamp: 1675593105,
    viewCount: 12,
    likeCount: 12,
    answerCount: 12,
    tags: ['react', 'react-hook-form'],
  },
  {
    questionId: 2,
    category: 'DEV',
    title: 'react-hook-form 정규표현식 관리방법',
    content:
      '안녕하세요. react-hook-form을 사용해서 프로젝트를 하고 있습니다. 정규 표현식을\n' +
      'react-hook-form에서 사용할 때 다양한 방법이 있는 것으로 알고 있는데 보통 보통...',
    timestamp: 1675593105,
    viewCount: 12,
    likeCount: 12,
    answerCount: 12,
    tags: ['react', 'react-hook-form'],
  },
  {
    questionId: 3,
    category: 'DEV',
    title: 'react-hook-form 정규표현식 관리방법',
    content:
      '안녕하세요. react-hook-form을 사용해서 프로젝트를 하고 있습니다. 정규 표현식을\n' +
      'react-hook-form에서 사용할 때 다양한 방법이 있는 것으로 알고 있는데 보통 보통...',
    timestamp: 1675593105,
    viewCount: 12,
    likeCount: 12,
    answerCount: 12,
    tags: ['react', 'react-hook-form'],
  },
];

const WaitForAnswer = () => {
  return (
    <WaitForAnswerWrapper>
      <HomeSectionTitle title="답변을 기다리는 질문" />
      <ul>
        {questionList?.map((question) => {
          return (
            <li key={question.questionId}>
              <Link to={`/question/${question.questionId}`}>
                <QuestionItem {...question} />
              </Link>
            </li>
          );
        })}
      </ul>
    </WaitForAnswerWrapper>
  );
};

export default WaitForAnswer;
