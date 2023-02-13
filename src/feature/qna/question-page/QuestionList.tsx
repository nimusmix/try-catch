import { useInfiniteQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Dispatch, Fragment, useEffect } from 'react';
import { getQuestionList } from '../../../apis/qna/qna';
import qnaCategoryState from '../../../recoil/qnaCategoryState';
import { QuestionItem } from '../index';
import question from '../Question';
import qnaSearchKeywordState from '../../../recoil/qnaSearchKeywordState';
import { logOnDev } from '../../../utils/logging';
import QuestionNoContent from './QuestionNoContent';

const QuestionList = ({
  filter,
  setIsLoading,
}: {
  filter: string;
  setIsLoading: Dispatch<boolean>;
}) => {
  const [activeCategory, setActiveCategory] = useRecoilState<string>(qnaCategoryState);
  const keyword = useRecoilValue(qnaSearchKeywordState);

  useEffect(() => {
    logOnDev.log(keyword);
  }, [keyword]);

  // TODO 나중에 search 엔드포인트 변경되면 그때 바꾸면 됨
  const {
    data: questionList,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
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
      // 필터 부분 select로 원하는 데이터로 만들어 줌
      select: (data) => {
        let filteredData;
        if (keyword === '') {
          filteredData = {
            pages: data.pages.map((page) => ({
              data: page.data.filter((item) => {
                // 해결됨
                if (filter === 'solved') return item.isSolved;
                // 미해결
                if (filter === 'unSolved') return !item.isSolved;
                // 전체
                return item;
              }),
            })),
            pageParams: data.pageParams,
          };
        } else {
          filteredData = {
            pages: data.pages.map((page) => ({
              data: page.data.filter((item) => {
                // 해결됨
                if (filter === 'solved')
                  return (
                    (item.isSolved &&
                      (item.title.includes(keyword) || item.content.includes(keyword))) ||
                    item.tags.some((tag) => tag.toLocaleLowerCase() === keyword)
                  );
                // 미해결
                if (filter === 'unSolved')
                  return (
                    (!item.isSolved &&
                      (item.title.includes(keyword) || item.content.includes(keyword))) ||
                    item.tags.some((tag) => tag.toLocaleLowerCase() === keyword)
                  );
                // 전체
                return (
                  item.title.includes(keyword) ||
                  item.content.includes(keyword) ||
                  item.tags.some((tag) => tag.toLocaleLowerCase() === keyword)
                );
              }),
            })),
            pageParams: data.pageParams,
          };
        }
        return { ...filteredData };
      },
    }
  );

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

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
    <>
      {/* 결과가 없으면 */}
      {questionList?.pages.reduce((acc, page) => acc + page.data.length, 0) === 0 && (
        <QuestionNoContent />
      )}
      <ul>
        {questionList?.pages?.map((page, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={index}>
              {page.data.map((questionItem) => {
                return (
                  <li key={questionItem.questionId}>
                    <QuestionItem {...questionItem} />
                  </li>
                );
              })}
            </Fragment>
          );
        })}
      </ul>
    </>
  );
};

export default QuestionList;
