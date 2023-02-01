import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { Paragraph, SubTitle } from '../../components';
import Layout from '../../layout/Layout';
import { isDarkState } from '../../recoil';
import SideNavbar from '../../components/side-navbar/SideNavbar';
import { SettingNav } from '../../feature/settings';

const SettingContainer = styled.div`
  display: flex;
  min-width: var(--breakpoints-desktop);
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  min-width: var(--breakpoints-desktop);
  /* max-width: var(--breakpoints-desktop); */

  h3 {
    margin: 2.5rem 0 1rem;
  }
`;

const SettingHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 3rem 0;
  h2 {
    margin-right: 2.5rem;
  }
`;

const navOptions = [
  {
    id: 1,
    option: '테마',
  },
  {
    id: 2,
    option: '이메일 알림',
  },
  {
    id: 3,
    option: '고급기능',
  },
  {
    id: 4,
    option: '소개',
  },
  {
    id: 5,
    option: '고객센터',
  },
];

const SettingHeader = () => {
  const isDark = useRecoilValue(isDarkState);
  return (
    <SettingHeaderWrapper>
      <SubTitle textAlign="left">설정</SubTitle>
      <Paragraph
        color={isDark ? 'var(--colors-white-200)' : 'var(--colors-black-200)'}
        textAlign="left"
        sizeType="base"
      >
        설정페이지 설명입니다.
      </Paragraph>
    </SettingHeaderWrapper>
  );
};
const ThemeAside = styled.aside`
  width: 30%;

  border: 1px solid red;
  /* margin: 3rem 1.5rem 0;
  position: sticky;
  top: 6rem;
  height: 500px; */
`;

// setting Nav bar와 오른쪽에 내용
const SettingBody = styled.section`
  display: flex;
  flex-direction: row;
`;

const ThemeSettingsPage = () => {
  const [activeCategory, setActiveCategory] = useState('개발');
  return (
    <Layout>
      <SettingContainer>
        <Section>
          <SettingHeader />

          <SettingBody>
            <ThemeAside>
              <SettingNav />
              <SideNavbar navOptions={navOptions} changeOption={setActiveCategory} />
            </ThemeAside>
            <div style={{ width: '70%' }}>내용</div>
          </SettingBody>
        </Section>
      </SettingContainer>
    </Layout>
  );
};

export default ThemeSettingsPage;
