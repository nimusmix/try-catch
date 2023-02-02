import styled from 'styled-components';
import { MiniTitle, Paragraph } from '../../components';

export const SettingsBody = styled.section`
  padding: 0 0 0 80px;
  border-left: 1px solid;
  border-color: ${({ theme: { borderColor } }) => borderColor};
  min-height: 70vh;
`;

const ThemeHeader = () => {
  return (
    <MiniTitle sizeType="3xl" textAlign="left">
      테마
    </MiniTitle>
  );
};

const ThemeWrapper = styled.div`
  margin: 2rem 0;
  display: flex;
`;

const ThemeItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DefaultTheme = () => {
  return (
    <ThemeItemWrapper>
      <MiniTitle sizeType="xl" textAlign="left" style={{ marginBottom: '1rem' }}>
        시스템 설정 값
      </MiniTitle>
      <div>
        <svg
          width="350"
          height="178"
          viewBox="0 0 350 178"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_957_5897)">
            <rect width="350" height="178" rx="14" fill="#EEF2FF" />
            <rect x="24.915" y="19" width="141.186" height="23" rx="6" fill="#0F172A" />
            <rect x="24.915" y="49" width="236.102" height="24" rx="6" fill="#64748B" />
            <rect x="24.915" y="80" width="300.169" height="78" rx="6" fill="#FCFCFC" />
            <rect x="24.915" y="164" width="300.169" height="78" rx="6" fill="#FCFCFC" />
          </g>
          <path
            d="M170.848 0H336C343.732 0 350 6.26801 350 14V164C350 171.732 343.732 178 336 178H170.848V0Z"
            fill="#0F172A"
          />
          <path
            d="M170.848 80H319.085C322.399 80 325.085 82.6863 325.085 86V152C325.085 155.314 322.399 158 319.085 158H170.848V80Z"
            fill="#232B3E"
          />
          <path
            d="M170.848 49H319.085C322.399 49 325.085 51.6863 325.085 55V67C325.085 70.3137 322.399 73 319.085 73H170.848V49Z"
            fill="#9CA3AF"
          />
          <path
            d="M170.848 164H319.085C322.399 164 325.085 166.686 325.085 170V172C325.085 175.314 322.399 178 319.085 178H170.848V164Z"
            fill="#232B3E"
          />
          <defs>
            <clipPath id="clip0_957_5897">
              <rect width="350" height="178" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </ThemeItemWrapper>
  );
};

const DarkTheme = () => {
  return (
    <ThemeItemWrapper style={{ marginRight: '4rem' }}>
      <MiniTitle sizeType="xl" textAlign="left" style={{ marginBottom: '1rem' }}>
        다크모드
      </MiniTitle>
      <div>
        <svg
          width="350"
          height="178"
          viewBox="0 0 350 178"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_425_6774)">
            <rect width="350" height="178" rx="14" fill="#0F172A" />
            <rect x="24.915" y="19" width="141.186" height="23" rx="6" fill="#ECFDF5" />
            <rect x="24.915" y="49" width="236.102" height="24" rx="6" fill="#9CA3AF" />
            <rect x="24.915" y="80" width="300.169" height="78" rx="6" fill="#232B3E" />
            <rect x="24.915" y="164" width="300.169" height="78" rx="6" fill="#232B3E" />
          </g>
          <defs>
            <clipPath id="clip0_425_6774">
              <rect width="350" height="178" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </ThemeItemWrapper>
  );
};

const LightTheme = () => {
  return (
    <ThemeItemWrapper>
      <MiniTitle sizeType="xl" textAlign="left" style={{ marginBottom: '1rem' }}>
        라이트 모드
      </MiniTitle>
      <div>
        <svg
          width="350"
          height="178"
          viewBox="0 0 350 178"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_425_6776)">
            <rect width="350" height="178" rx="14" fill="#EEF2FF" />
            <rect x="24.915" y="19" width="141.186" height="23" rx="6" fill="#0F172A" />
            <rect x="24.915" y="49" width="236.102" height="24" rx="6" fill="#64748B" />
            <rect x="24.915" y="80" width="300.169" height="78" rx="6" fill="#FCFCFC" />
            <rect x="24.915" y="164" width="300.169" height="78" rx="6" fill="#FCFCFC" />
          </g>
          <defs>
            <clipPath id="clip0_425_6776">
              <rect width="350" height="178" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </ThemeItemWrapper>
  );
};

const ThemeSettingsPage = () => {
  return (
    <SettingsBody>
      <ThemeHeader />
      <ThemeWrapper>
        <DefaultTheme />
      </ThemeWrapper>
      <ThemeWrapper>
        <DarkTheme />
        <LightTheme />
      </ThemeWrapper>
    </SettingsBody>
  );
};

export default ThemeSettingsPage;
