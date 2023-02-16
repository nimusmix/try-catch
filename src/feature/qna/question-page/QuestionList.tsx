import { useInfiniteQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Dispatch, Fragment, useEffect } from 'react';
import { getQuestionList } from '../../../apis/qna/qna';
import qnaCategoryState from '../../../recoil/qnaCategoryState';
import { QuestionItem } from '../index';
import question from '../Question';
import qnaSearchKeywordState from '../../../recoil/qnaSearchKeywordState';
import QuestionNoContent from './QuestionNoContent';
import isMobileState from '../../../recoil/isMobileState';
import useWindowSize from '../../../hooks/useWindowSize';
import QnaPageTopState from '../../../recoil/qnaPageTopState';

const QuestionList = ({
  filter,
  setIsLoading,
}: {
  filter: string;
  setIsLoading: Dispatch<boolean>;
}) => {
  const isMobile = useRecoilValue(isMobileState);
  const [windowWidth] = useWindowSize();
  const [top, setTop] = useRecoilState(QnaPageTopState);
  const [activeCategory, setActiveCategory] = useRecoilState<string>(qnaCategoryState);
  const keyword = useRecoilValue(qnaSearchKeywordState);

  // // 1. timeout을 줘서 스크롤이 끝난 후 작동하게 하는 방법
  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({
        top,
        behavior: 'smooth', // for smoothly scrolling
      });
    }, 100);
  };

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
                if (filter === 'solved') {
                  return (
                    item.isSolved &&
                    (item.title.toLocaleLowerCase().includes(keyword) ||
                      item.content.toLocaleLowerCase().includes(keyword) ||
                      item.tags.some((tag) => tag.toLocaleLowerCase() === keyword))
                  );
                }
                // 미해결
                if (filter === 'unSolved')
                  return (
                    !item.isSolved &&
                    (item.title.toLocaleLowerCase().includes(keyword) ||
                      item.content.toLocaleLowerCase().includes(keyword) ||
                      item.tags.some((tag) => tag.toLocaleLowerCase() === keyword))
                  );
                // 전체
                return (
                  item.title.toLocaleLowerCase().includes(keyword) ||
                  item.content.toLocaleLowerCase().includes(keyword) ||
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
    scrollToTop();
    setTop(180);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, activeCategory, filter]);

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
      <ul className="question-list">
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
