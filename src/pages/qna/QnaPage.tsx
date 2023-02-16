import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import loadable from '@loadable/component';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { HeaderImage, Layout } from '../../layout';
import { Button, Paragraph, SubTitle } from '../../components';
import { PopularQna, QnaPopularTag, QnaSearchBar } from '../../feature/qna';
import QuestionList from '../../feature/qna/question-page/QuestionList';
import { header_qna } from '../../assets';
import SideNavbar from '../../components/side-navbar/SideNavbar';
import qnaCategoryState from '../../recoil/qnaCategoryState';
import { IconPen } from '../../components/icons/Icons';
import { useQuestionDispatch } from '../../context/QnaContext';
import QnaListSkeleton from '../../feature/qna/skeleton/QnaListSkeleton';
import QnaPopularTagsSkeleton from '../../feature/qna/skeleton/QnaPopularTagsSkeleton';
import { isLoggedInState, toastState } from '../../recoil';
import { media } from '../../utils/media';

const DetailPage = loadable(() => import('./QnaDetailPage'));

const navOptions = [
  {
    id: 1,
    option: '개발',
    value: 'DEV',
  },
  {
    id: 2,
    option: '커리어',
    value: 'CAREER',
  },
];

export const QuestionPageBody = styled.section`
  display: flex;

  max-width: var(--breakpoints-desktop);

  ${media.phone`
    width: 100%;
    max-width: unset;
    flex-direction: column;   
  `}
`;

export const Aside = styled.aside`
  margin: 3rem 1.5rem 0;
  position: sticky;
  top: 6rem;
  height: 500px;

  ${media.phone`
    height: auto;
    margin:0;
    padding: 3rem 1.5rem 0;
    top: 3rem;
    background-color: ${({ theme: { bgColor } }: any) => bgColor};
    backdrop-filter: blur(30px);
    &.qna-button-wrapper{
      display: none
      
    }
  `}
`;

const Ul = styled.ul`
  padding-top: 3rem;
  display: flex;
  max-width: 848px;
`;

const Li = styled.li`
  width: 220px;
  text-align: center;
  height: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.textColor100};
  color: ${({ theme }) => theme.textColor100};
  cursor: pointer;
  transition: color 0.4s ease-in, border 0.2s ease-in;

  &:hover,
  &.active {
    border-bottom: 2px solid var(--colors-brand-500);
    color: var(--colors-brand-500);
    font-weight: 600;
  }
`;

const QnaFilterWrapper = styled.div`
  position: sticky;
  top: 11.6rem;
  opacity: 0.9;
  background: ${({ theme: { bgColor } }) => bgColor};

  ${media.phone`
    top: 17.5rem;
  `}
`;

const filterOptions = [
  { id: 1, option: '전체', value: 'all' },
  { id: 2, option: '해결', value: 'solved' },
  { id: 3, option: '미해결', value: 'unSolved' },
];

const QnaPage = () => {
  const [activeCategory, setActiveCategory] = useRecoilState(qnaCategoryState);
  const [filter, setFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isLogin = useRecoilValue(isLoggedInState);
  const setToast = useSetRecoilState(toastState);
  const dispatch = useQuestionDispatch();
  const activeIdx = navOptions.findIndex((option) => option.value === activeCategory);
  const navigate = useNavigate();

  const onClickWriteButton = () => {
    if (!isLogin) {
      setToast({ type: 'negative', message: '로그인 후 이용할 수 있어요', isVisible: true });
      return;
    }
    navigate('form');
  };

  // 디테일 페이지를 미리 로드 (효과가 있는지 잘 모르겠음..)
  useEffect(() => {
    DetailPage.preload();
    dispatch({ type: 'RESET' });
  }, [dispatch]);

  return (
    <Layout>
      <HeaderImage image={header_qna}>
        <SubTitle>Q&A</SubTitle>
        <Paragraph sizeType="base">좋은 질문과 답변으로 지식을 쌓아보세요</Paragraph>
      </HeaderImage>
      <QuestionPageBody>
        {/* 왼쪽 네비게이션 */}
        <Aside>
          <SideNavbar
            navOptions={navOptions}
            changeOption={setActiveCategory}
            activeIdx={activeIdx}
          />
        </Aside>
        {/* 메인 컨텐츠 */}
        <section>
          <QnaSearchBar />
          <QnaFilterWrapper>
            <Ul>
              {filterOptions.map((option) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <Li
                  key={option.id}
                  onClick={() => setFilter(option.value)}
                  className={option.value === filter ? 'active' : ''}
                >
                  {option.option}
                </Li>
              ))}
            </Ul>
          </QnaFilterWrapper>
          {/* 로딩 시 스켈레톤 */}
          {isLoading && <QnaListSkeleton />}
          {/* Q&A 리스트 */}
          <QuestionList filter={filter} setIsLoading={setIsLoading} />
        </section>
        <Aside className="qna-button-wrapper">
          <Button
            width="100%"
            fontSize="var(--fonts-body-base)"
            padding="0.455rem 1.125rem"
            margin="0 0 1rem 0"
            onClick={onClickWriteButton}
          >
            <IconPen />
            &nbsp;&nbsp;질문 작성하기
          </Button>
          {/* 인기 태그 */}
          {isLoading && <QnaPopularTagsSkeleton />}
          {isLoading || <QnaPopularTag />}
          {/* 인기 Q&A */}
          <PopularQna />
        </Aside>
      </QuestionPageBody>
    </Layout>
  );
};

export default QnaPage;
