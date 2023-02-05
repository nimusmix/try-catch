import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import QuestionItem from './QuestionItem';

import { getQuestionList } from '../../../apis/qna/qna';
import { IQuestion } from '../../../interface/qna';

const QuestionList = ({ activeCategory }: { activeCategory: string }) => {
  const { isLoading, data: questionList } = useQuery<Array<IQuestion>>(
    ['question', 'questionList'] as const,
    getQuestionList
  );

  return (
    <ul>
      {questionList?.map((question) => {
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
