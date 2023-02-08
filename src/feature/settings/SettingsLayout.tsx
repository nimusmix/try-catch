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
  width: 250px;

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
  /* top: 200px;
  bottom: 0px;
  position: fixed;
  overflow-y: scroll; */
`;

const SettingContent = styled.div`
  width: 840px;
  /* left: 400px; */
  /* top: 60px;
  bottom: 0px; */
  /* position: fixed; */
  /* overflow-y: scroll; */
`;

const SettingsLayout = ({ children }: ILayoutProps) => {
  // const [activeCategory, setActiveCategory] = useState('DEV');
  return (
    <Layout>
      <SettingContainer>
        <SettingHeader />

        <SettingBody>
          <SettingAside>
            <SettingNav />
          </SettingAside>
          <SettingContent>{children}</SettingContent>
        </SettingBody>
      </SettingContainer>
    </Layout>
  );
};

export default SettingsLayout;
