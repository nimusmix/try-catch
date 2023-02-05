import styled from 'styled-components';
import { SettingsBody } from './ThemeSettingsPage';
import { SettingHeader as IntroduceHeader } from '../../feature/settings';
import { MiniTitle, Paragraph } from '../../components';

const IntroduceWrapper = styled.div`
  margin: 2rem 0;
  display: flex;
`;

const IntroduceItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Li = styled.div`
  ::marker {
    content: '✝ ';
    font-size: 1.2em;
  }
`;

const IntroducePage = () => {
  return (
    <SettingsBody>
      <IntroduceHeader title="소개" />
      <IntroduceWrapper>
        <IntroduceItemWrapper>
          <MiniTitle sizeType="xl" textAlign="left" style={{ marginBottom: '1rem' }}>
            TryCatch
          </MiniTitle>
          <Paragraph sizeType="base">
            TryCatch 서비스 소개 내용입니다. TryCatch 서비스 소개 내용입니다.TryCatch 서비스 소개
            내용입니다.TryCatch 서비스 소개 내용입니다.
          </Paragraph>
        </IntroduceItemWrapper>
      </IntroduceWrapper>
      <IntroduceItemWrapper>
        <MiniTitle sizeType="xl" textAlign="left" style={{ marginBottom: '1rem' }}>
          개인정보처리방침
        </MiniTitle>
        <Paragraph sizeType="base">
          개인정보 처리방침 내용입니다. 개인정보 처리방침 내용입니다. 개인정보 처리방침 내용입니다.
          개인정보 처리방침 내용입니다. 개인정보 처리방침 내용입니다.
        </Paragraph>
      </IntroduceItemWrapper>
      <IntroduceWrapper>
        <IntroduceItemWrapper>
          <MiniTitle sizeType="xl" textAlign="left" style={{ marginBottom: '1rem' }}>
            이용 약관
          </MiniTitle>
          <Paragraph sizeType="base">
            TryCatch은 매일 수많은 개발자들이 새로운 방식으로 개발 지식을 습득하고 다른 개발자와
            상호작용할 수 있도록 다양한 서비스를 구축합니다. 그러한 서비스는 다음을 포함합니다.
          </Paragraph>
          <ul style={{ listStyleType: 'disc', margin: '0.6rem 1.5rem' }}>
            <li>TryCatch 질문 검색, 피드 검색, 관심 기술 스택</li>
            <li>GitHub repository 권한</li>
            <li>회사 이메일, 연락처(email)</li>
            <li>Alan Shepard</li>
          </ul>
          <Paragraph sizeType="base">
            사용자는 개인 정보 관리를 위해 다양한 방식으로 TryCatch 서비스를 활용할 수 있습니다.
            예를 들어 개발 블로그 피드 관리하거나 더 관련성 높은 검색결과를 보고 싶으면 TryCatch에
            가입할 수 있습니다
          </Paragraph>
        </IntroduceItemWrapper>
      </IntroduceWrapper>
    </SettingsBody>
  );
};

export default IntroducePage;
