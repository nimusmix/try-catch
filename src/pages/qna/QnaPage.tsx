import { createRef, useState } from 'react';
import styled from 'styled-components';
import { MdOutlineCreate } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { HeaderImage, Layout } from '../../layout';
import { Button, Paragraph, SubTitle } from '../../components';
import { PopularQna, QnaNavbar, QnaPopularTag, QnaSearchBar } from '../../feature/qna';
import QuestionList from '../../feature/qna/QuestionList';
import { header_qna } from '../../assets';

const qnaPopularTags = [
  { id: 1, tagName: 'React' },
  { id: 2, tagName: 'Recoil' },
  { id: 3, tagName: 'Docker' },
  { id: 4, tagName: 'JPA' },
  { id: 5, tagName: 'Spring' },
  { id: 6, tagName: 'AWS' },
  { id: 7, tagName: 'PJT' },
  { id: 8, tagName: 'Fighting' },
  { id: 9, tagName: 'Aja Aja' },
];

export const QuestionPageBody = styled.section`
  display: flex;
  max-width: var(--breakpoints-desktop);
`;

const Aside = styled.aside`
  margin: 3rem 1.5rem 0;
  position: sticky;
  top: 6rem;
  left: 0;
  height: 500px;
`;

const QnaPage = () => {
  const [activeNavOption, setActiveNavOption] = useState<string | null>('개발');
  const navigation = createRef();

  const handleNavOptionClick = (event: React.MouseEvent<HTMLHeadingElement>) => {
    const target = event.target as Element;
    const navOptionName = target.getAttribute('data-name');
    setActiveNavOption(navOptionName);
  };

  return (
    <Layout>
      <HeaderImage image={header_qna}>
        <SubTitle color="var(--colors-black-500)" margin="0 0 0.2rem 0">
          Q&A
        </SubTitle>
        <Paragraph sizeType="base" color="var(--colors-black-400)">
          Q&A 게시판에 대한 설명이 들어갈 자리입니다.
        </Paragraph>
      </HeaderImage>
      <QuestionPageBody>
        <Aside>
          <QnaNavbar
            ref={navigation}
            currentOption={activeNavOption}
            handleNavOptionClick={handleNavOptionClick}
          />
        </Aside>
        <section>
          <QnaSearchBar />
          <QuestionList />
        </section>
        <Aside>
          <Link to="form">
            <Button
              width="100%"
              fontSize="var(--fonts-body-base)"
              padding="0.455rem 1.125rem"
              margin="0 0 1rem 0"
            >
              <MdOutlineCreate />
              &nbsp;&nbsp;질문 작성하기
            </Button>
          </Link>
          <QnaPopularTag tags={qnaPopularTags} />
          <PopularQna />
        </Aside>
      </QuestionPageBody>
    </Layout>
  );
};

export default QnaPage;
