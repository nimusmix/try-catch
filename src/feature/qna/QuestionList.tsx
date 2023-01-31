import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import QuestionItem from './QuestionItem';
import { axiosQuestionList } from '../../utils/api';
import { IQuestion } from '../../interface/qna';

const QuestionList = () => {
  const { isLoading, data: questionItemList } = useQuery<Array<IQuestion>>(
    ['questionItemList'],
    () => axiosQuestionList()
  );
  return (
    <ul>
      {questionItemList?.map((question) => {
        return (
          <li key={question.questionId}>
            <Link to={`${question.questionId}`}>
              <QuestionItem {...question} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default QuestionList;
