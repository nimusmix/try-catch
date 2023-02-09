import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { getUserAnswer, getUserId } from '../../../apis/profile/profile';
import { IUserAnswer } from '../../../interface/user';
import AnswerListItem from './AnswerListItem';

const AnswerList = () => {
  const { userName } = useParams();
  const { data: userId, isLoading: userIdLoading } = useQuery<number>(
    ['answerList', 'userId'] as const,
    () => getUserId(userName!)
  );

  const { data: answerList, isLoading: myAnswerLoading } = useQuery<Array<IUserAnswer>>(
    ['annswerList'],
    () => getUserAnswer(userId!),
    {
      enabled: !!userId,
    }
  );

  if (userIdLoading || myAnswerLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {answerList!.map((ans: IUserAnswer) => {
        return (
          <Link to={`/question/${ans.questionId}`} key={ans.answerId}>
            <AnswerListItem {...ans} />
          </Link>
        );
      })}
    </>
  );
};

export default AnswerList;
