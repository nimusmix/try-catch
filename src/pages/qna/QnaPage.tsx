import { createRef, useState } from 'react';
import Layout from '../../layout/Layout';
import { SubTitle } from '../../components';
import { QnaNavbar, QnaPopularTag, QnaSearchBar } from '../../feature/qna';
import QuestionList from '../../feature/qna/QuestionList';

const QnaPage = () => {
  const [activeNavOption, setActiveNavOption] = useState<string | null>('개발');
  const navigation = createRef();

  const handleNavOptionClick = (event: React.MouseEvent<HTMLHeadingElement>) => {
    const target = event.target as Element;
    const navOptionName = target.getAttribute('data-name');
    setActiveNavOption(navOptionName);
  };

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
  return (
    <Layout>
      <section style={{ marginBottom: '3rem' }}>
        <SubTitle textAlign="left" margin="0 0 0 1rem">
          Q&A
        </SubTitle>
      </section>
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
        </aside>
      </section>
    </Layout>
  );
};

export default QnaPage;
