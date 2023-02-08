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
  const { data: questionList } = useQuery<Array<IQuestion>>(
    ['myQuestionList'],
    () => getUserQuestion(userId!),
    {
      enabled: !!userId,
    }
  );
  console.log(questionList);
  return (
    <p>ㅎㅎ</p>
    // {questionList.map((q: IQuestion) => {
    //   <Link to={`/question/${q.questionId}`}></Link>
    // })}
  );
};

export default MyQuestionList;
