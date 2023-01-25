import { createRef, useState } from 'react';
import { HeaderImage, Layout } from '../../layout';
import { Paragraph, SubTitle } from '../../components';
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
      <section style={{ display: 'flex' }}>
        <aside style={{ margin: '0 1.5rem 0' }}>
          <QnaNavbar
            ref={navigation}
            currentOption={activeNavOption}
            handleNavOptionClick={handleNavOptionClick}
          />
        </aside>
        <section>
          <QnaSearchBar />
          <QuestionList />
        </section>
        <aside style={{ margin: '0 1.5rem 0' }}>
          <QnaPopularTag tags={qnaPopularTags} />
          <PopularQna />
        </aside>
      </section>
    </Layout>
  );
};

export default QnaPage;
