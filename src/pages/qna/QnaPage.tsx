import { createRef, useState } from 'react';
import Layout from '../../layout/Layout';
import { SubTitle } from '../../components';
import { QnaNavbar } from '../../feature/qna';

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
      <section style={{ marginBottom: '3rem' }}>
        <SubTitle textAlign="left" margin="0 0 0 1rem">
          Q&A
        </SubTitle>
      </section>
      <aside>
        <QnaNavbar
          ref={navigation}
          currentOption={activeNavOption}
          handleNavOptionClick={handleNavOptionClick}
        />
      </aside>
    </Layout>
  );
};

export default QnaPage;
