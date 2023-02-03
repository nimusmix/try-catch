import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { Paragraph, SubTitle } from '../../components';
import Layout, { ILayoutProps } from '../../layout/Layout';
import { isDarkState } from '../../recoil';
import SettingNav from './SettingNav';

const SettingContainer = styled.div`
  display: flex;
  min-width: var(--breakpoints-desktop);
  flex-direction: column;
  padding: 0 4rem;
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
const SettingAside = styled.aside`
  width: 25%;

  /* border: 1px solid red; */
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

const SettingsLayout = ({ children }: ILayoutProps) => {
  // const [activeCategory, setActiveCategory] = useState('개발');
  return (
    <Layout>
      <SettingContainer>
        <SettingHeader />

        <SettingBody>
          <SettingAside>
            <SettingNav />
            {/* <SideNavbar navOptions={navOptions} changeOption={setActiveCategory} /> */}
          </SettingAside>
          <div style={{ width: '70%' }}>{children}</div>
        </SettingBody>
      </SettingContainer>
    </Layout>
  );
};

export default SettingsLayout;
