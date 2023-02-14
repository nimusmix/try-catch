import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { getUserAnswer, getUserId } from '../../../apis/profile/profile';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';
import { IUserAnswer } from '../../../interface/user';
import AnswerListItem from './AnswerListItem';
import ProfileEmptyUnder from './ProfileEmptyUnder';

const AnswerList = () => {
  const { userName } = useParams();
  const { data: userId, isLoading: userIdLoading } = useQuery<number>(
    ['answerList', 'userId'] as const,
    () => getUserId(userName!)
  );

  const { data: answerList, isLoading: myAnswerLoading } = useQuery<Array<IUserAnswer>>(
    ['annswerList', userName],
    () => getUserAnswer(userId!),
    {
      enabled: !!userId,
    }
  );

  // 로딩중일 때
  if (userIdLoading || myAnswerLoading) {
    return <LoadingSpinner />;
  }

  // 컨텐츠가 없을 때
  if (answerList?.length === 0) {
    return <ProfileEmptyUnder category={1} />;
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
