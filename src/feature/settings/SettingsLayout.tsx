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
        테마 설정과 깃허브 레포지토리 설정을 할 수 있어요
      </Paragraph>
    </SettingHeaderWrapper>
  );
};
const SettingAside = styled.aside`
  width: 250px;
`;

// setting Nav bar와 오른쪽에 내용
const SettingBody = styled.section`
  display: flex;
  flex-direction: row;
`;

const SettingContent = styled.div`
  width: 840px;
`;

const SettingsLayout = ({ children }: ILayoutProps) => {
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
