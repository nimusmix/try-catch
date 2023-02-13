import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { NavLink } from 'react-router-dom';
import AnimationLoader from '../../components/animation/AnimationLoader';
import lightAnimationData from '../../assets/lottie/cat-light.json';
import darkAnimationData from '../../assets/lottie/cat-dark.json';
import { ReactComponent as LogoDarkTheme } from '../../assets/vertical_logo_dark_theme.svg';
import { ReactComponent as LogoLightTheme } from '../../assets/vertical_logo_light_theme.svg';
import { isDarkState } from '../../recoil';
import { IconEmail, IconGithub, IconGitlab } from '../../components/icons/Icons';
import { Paragraph } from '../../components';

const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  padding: 1.5rem;
  background-color: ${({ theme: { navColor } }) => navColor};
  height: calc(var(--toolbar-height) * 4);

  & > div {
    width: var(--breakpoints-desktop);
  }
`;

const AbsoluteWrapper = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  right: 15%;
  top: -95px;
`;

const FooterMain = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 6rem;
`;

const Mid = styled.nav`
  width: 100%;
  .footer-nav {
    display: flex;

    margin-bottom: 1.5rem;
    li {
      margin-right: 1.5rem;
      color: ${({ theme: { textColor100 } }) => textColor100};

      &:hover {
        color: var(--colors-brand-500);
        cursor: pointer;
      }
    }
  }
  .footer-desc {
    p {
      color: ${({ theme: { textColor100 } }) => textColor100};
      margin-bottom: 0.1rem;
    }
    a {
      margin-right: 0.5rem;
    }
    a:hover {
      color: var(--colors-brand-500);
    }
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;

  p {
    text-transform: uppercase;
    font-weight: 600;
  }

  img {
    width: 300px;
    translate: 2.2rem -1rem;
  }
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;

  & > svg:hover,
  & > a:hover {
    cursor: pointer;
    color: var(--colors-brand-500);
    transition: color 0.5s ease;
  }
`;

const members = [
  { name: '김보경(OPS)', github: 'https://github.com/Bogyie' },
  { name: '류기혁(BE)', github: 'https://github.com/hyeok00' },
  { name: '이은지(BE)', github: 'https://github.com/EZ-000' },
  { name: '김창준(FE)', github: 'https://github.com/ChangJuneKim' },
  { name: '서현아(FE)', github: 'https://github.com/hyeonaseome' },
  { name: '김수민(FE)', github: 'https://github.com/nimusmix' },
];

const Footer = () => {
  const isDark = useRecoilValue(isDarkState);

  return (
    <StyledFooter>
      <div>
        <AbsoluteWrapper>
          <AnimationLoader
            animationData={isDark ? darkAnimationData : lightAnimationData}
            autoplay
            loop
            opacity={1}
          />
        </AbsoluteWrapper>
        <FooterMain>
          <Left>
            <Logo>
              <NavLink to="/">
                {isDark && <LogoDarkTheme width="120" height="80" />}
                {isDark || <LogoLightTheme width="120" height="80" />}
              </NavLink>
            </Logo>
            <Icons>
              <a href="https://github.com/trycatch-ssafy">
                <IconGithub size="30" />
              </a>
              <IconGitlab size="30" />
              <IconEmail size="30" />
            </Icons>
          </Left>
          <Mid>
            <ul className="footer-nav">
              <li>사이트소개</li>
              <li>연락처</li>
              <li>버그제보</li>
              <li>서비스 이용약관</li>
            </ul>
            <div className="footer-desc">
              <Paragraph sizeType="sm">사이트명: 트라이캐치 | 문의 ssafy.e108@gmail.com</Paragraph>
              <Paragraph sizeType="sm">
                42♥좋은팀:{' '}
                {members.map((member) => (
                  <a key={member.name} href={member.github}>
                    {member.name}
                  </a>
                ))}
              </Paragraph>
              <Paragraph sizeType="sm">©SSAFY. ALL RIGHTS RESERVED</Paragraph>
            </div>
          </Mid>
          <Right>
            <Paragraph sizeType="base">sponsored by</Paragraph>
            <img src={new URL(`/src/assets/ssafy.png`, import.meta.url).href} alt="ssafy" />
          </Right>
        </FooterMain>
      </div>
    </StyledFooter>
  );
};

export default Footer;
