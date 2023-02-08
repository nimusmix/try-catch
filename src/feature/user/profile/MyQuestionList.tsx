import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { getUserId, getUserQuestion } from '../../../apis/profile/profile';
import { IQuestion } from '../../../interface/qna';
import { QuestionItem } from '../../qna';

const MyQuestionList = () => {
  const { userName } = useParams();
  const { data: userId } = useQuery<number>(['myQuestionList', 'userId'] as const, () =>
    getUserId(userName!)
  );
  const { data: questionList, isLoading } = useQuery<Array<IQuestion>>(
    ['myQuestionList'],
    () => getUserQuestion(userId!),
    {
      enabled: !!userId,
    }
  );

  console.log('내 질문 리스트', questionList);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {questionList!.map((ques: IQuestion) => {
        return (
          <Link to={`/question/${ques.questionId}`} key={ques.questionId}>
            <QuestionItem {...ques} />
          </Link>
        );
      })}
    </>
  );
};

export default MyQuestionList;
