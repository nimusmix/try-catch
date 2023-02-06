import { Link, useLocation } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { getQuestionList } from '../../../apis/qna/qna';
import qnaCategoryState from '../../../recoil/qnaCategoryState';
import { QuestionItem } from '../index';
import question from '../Question';

const QuestionList = ({ filter }: { filter: string }) => {
  const [activeCategory, setActiveCategory] = useRecoilState<string>(qnaCategoryState);
  const [test, setTest] = useState(false);
  const keyword = new URLSearchParams(useLocation().search).get('keyword') || '';
  const {
    data: questionList,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['question', 'questionList', activeCategory] as const,
    ({ pageParam = 0 }) => {
      const params = {
        query: keyword,
        page: pageParam,
        category: activeCategory as 'DEV' | 'CAREER' | 'BALANCE',
        size: 10,
      };
      return getQuestionList(params);
    },
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
      select: (data) => {
        console.log(data);
        // const filteredPages =
        return { ...data };
      },
    }
  );

  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 500) {
        fetchNextPage();
      }
    };
    if (!isFetchingNextPage) window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchNextPage, isFetchingNextPage]);

  return (
    <ul>
      {questionList?.pages?.map((page, index) => {
        return (
          <>
            {page.data.map((questionItem) => {
              return (
                <li key={questionItem.questionId}>
                  <Link to={`${questionItem.questionId}`}>
                    <QuestionItem {...questionItem} />
                  </Link>
                </li>
              );
            })}
          </>
        );
      })}
    </ul>
  );
};

export default QuestionList;
