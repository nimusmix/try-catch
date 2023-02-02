import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import QuestionItem from './QuestionItem';

import { IQuestion } from '../../../interface/qna';
import { getQuestionList } from '../../../apis/qna/qna';

const QuestionList = ({ activeCategory }: { activeCategory: string }) => {
  const { isLoading, data: questionList } = useQuery<Array<IQuestion>>(['questionList'], () =>
    getQuestionList()
  );

  const filteredQuestionList = questionList?.filter(
    (question) => question.category === activeCategory
  );

  return (
    <ul>
      {filteredQuestionList?.map((question) => {
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
