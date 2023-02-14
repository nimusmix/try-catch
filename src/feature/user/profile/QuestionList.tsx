import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getUserId, getUserQuestion } from '../../../apis/profile/profile';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';
import { IQuestion } from '../../../interface/qna';
import { QuestionItem } from '../../qna';
import ProfileEmptyUnder from './ProfileEmptyUnder';

const QuestionWrapper = styled.section`
  width: 800px;
`;

const QuestionList = () => {
  const { userName } = useParams();
  const { data: userId, isLoading: userIdLoading } = useQuery<number>(
    ['questionList', 'userId'] as const,
    () => getUserId(userName!)
  );

  const { data: questionList, isLoading: questionLoading } = useQuery<Array<IQuestion>>(
    ['questionList', userName],
    () => getUserQuestion(userId!),
    {
      enabled: !!userId,
    }
  );

  if (userIdLoading || questionLoading) {
    return <LoadingSpinner />;
  }

  if (questionList?.length === 0) {
    return <ProfileEmptyUnder category={0} />;
  }

  return (
    <QuestionWrapper>
      {questionList?.map((ques: IQuestion) => {
        return (
          <Link to={`/question/${ques.questionId}`} key={ques.questionId}>
            <QuestionItem {...ques} />
          </Link>
        );
      })}
    </QuestionWrapper>
  );
};

export default QuestionList;
