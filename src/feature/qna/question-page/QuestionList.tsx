import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import QuestionItem from './QuestionItem';

import { getQuestionList } from '../../../apis/qna/qna';
import { IQuestion } from '../../../interface/qna';
import qnaCategoryState from '../../../recoil/qnaCategoryState';

const QuestionList = () => {
  const [activeCategory, setActiveCategory] = useRecoilState<'DEV' | 'CAREER' | 'BALANCE'>(
    qnaCategoryState
  );
  const { isLoading, data: questionList } = useQuery<Array<IQuestion>>(
    ['question', 'questionList', activeCategory] as const,
    () => getQuestionList(activeCategory)
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
