import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import loadable from '@loadable/component';
import { useRecoilState } from 'recoil';
import { HeaderImage, Layout } from '../../layout';
import { Button, Paragraph, SubTitle } from '../../components';
import { PopularQna, QnaPopularTag, QnaSearchBar } from '../../feature/qna';
import QuestionList from '../../feature/qna/question-page/QuestionList';
import { header_qna } from '../../assets';
import SideNavbar from '../../components/side-navbar/SideNavbar';
import qnaCategoryState from '../../recoil/qnaCategoryState';
import { IconPen } from '../../components/icons/Icons';
import { useQuestionDispatch } from '../../context/QnaContext';

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
  {
    id: 3,
    option: '밸런스 게임',
    value: 'BALANCE',
  },
];

export const QuestionPageBody = styled.section`
  display: flex;
  max-width: var(--breakpoints-desktop);
`;

export const Aside = styled.aside`
  margin: 3rem 1.5rem 0;
  position: sticky;
  top: 6rem;
  height: 500px;
`;

const filterOptions = [
  { id: 1, option: '전체', value: 'all' },
  { id: 2, option: '해결', value: 'solved' },
  { id: 3, option: '미해결', value: 'unSolved' },
];

const Ul = styled.ul`
  margin-top: 3rem;
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
  transition: color, background-color 0.1s ease-in;

  &:hover,
  &.active {
    border-bottom: 2px solid var(--colors-brand-500);
    color: var(--colors-brand-500);
    font-weight: 600;
  }
`;

const QnaPage = () => {
  const [activeCategory, setActiveCategory] = useRecoilState(qnaCategoryState);
  const [filter, setFilter] = useState<string>('all');
  const dispatch = useQuestionDispatch();
  const activeIdx = navOptions.findIndex((option) => option.value === activeCategory);

  // 디테일 페이지를 미리 로드 (효과가 있는지 잘 모르겠음..)
  useEffect(() => {
    DetailPage.preload();
    dispatch({ type: 'RESET' });
  }, [dispatch]);

  return (
    <Layout>
      <HeaderImage image={header_qna}>
        <SubTitle>Q&A</SubTitle>
        <Paragraph sizeType="base">좋은 멘트 추천 받습니다.</Paragraph>
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
          <div>
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
          </div>
          {/* Q&A 리스트 */}
          <QuestionList filter={filter} />
        </section>
        <Aside>
          <Link to="form">
            <Button
              width="100%"
              fontSize="var(--fonts-body-base)"
              padding="0.455rem 1.125rem"
              margin="0 0 1rem 0"
            >
              <IconPen />
              &nbsp;&nbsp;질문 작성하기
            </Button>
          </Link>
          {/* 인기 태그 */}
          <QnaPopularTag />
          {/* 인기 Q&A */}
          <PopularQna />
        </Aside>
      </QuestionPageBody>
    </Layout>
  );
};

export default QnaPage;
