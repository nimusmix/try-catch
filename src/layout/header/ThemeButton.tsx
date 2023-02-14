import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { isDarkState } from '../../recoil';

const Wrapper = styled.div`
  .sun-and-moon {
    & > :is(.moon, .sun, .sun-beams) {
      transform-origin: center center;
    }

    & > :is(.moon, .sun) {
      fill: ${({ theme: { isDark } }) => (isDark ? '#ABB3BA' : '#FFCC00 ')};

      .theme-toggle:is(:hover, :focus-visible) > & {
        fill: ${({ theme: { isDark } }) =>
          isDark ? ' hsl(210 15% 90%)' : 'var(--colors-black-100)'};
      }
    }

    & > .sun-beams {
      stroke: ${({ theme: { isDark } }) => (isDark ? '#ABB3BA' : '#FFCC00 ')};
      stroke-width: 2px;

      .theme-toggle:is(:hover, :focus-visible) & {
        stroke: ${({ theme: { isDark } }) =>
          isDark ? ' hsl(210 15% 90%)' : 'var(--colors-black-100)'};
      }
    }

    & .sun {
      transform: ${({ theme: { isDark } }) => (isDark ? 'scale(1.75)' : null)};
    }
    & .sun-beams {
      opacity: ${({ theme: { isDark } }) => (isDark ? '0' : null)};
    }
    & .moon > circle {
      transform: ${({ theme: { isDark } }) => (isDark ? 'translateX(-7px)' : null)};

      @supports (cx: 1) {
        transform: ${({ theme: { isDark } }) => (isDark ? 'translateX(0)' : null)};
        cx: ${({ theme: { isDark } }) => (isDark ? '17' : null)};
      }
    }

    @media (prefers-reduced-motion: no-preference) {
      & .sun {
        transition: transform 1s cubic-bezier(0.5, 1.25, 0.75, 1.25);
      }
      & .sun-beams {
        transition: transform 0.5s cubic-bezier(0.5, 1.5, 0.75, 1.25),
          opacity 0.5s cubic-bezier(0.25, 0, 0.3, 1);
      }
      & .moon > circle {
        transition: transform 0.5s cubic-bezier(0, 0, 0, 1);

        @supports (cx: 1) {
          transition: cx 0.5s cubic-bezier(0, 0, 0, 1);
        }
      }

      & .sun {
        transform: ${({ theme: { isDark } }) => (isDark ? 'scale(1.75)' : null)};
        transition-timing-function: ${({ theme: { isDark } }) =>
          isDark ? 'cubic-bezier(.25,0,.3,1)' : null};
        transition-duration: ${({ theme: { isDark } }) => (isDark ? '0.5s' : null)};
      }

      & .sun-beams {
        transform: ${({ theme: { isDark } }) => (isDark ? 'rotateZ(-25deg)' : null)};
        transition-duration: ${({ theme: { isDark } }) => (isDark ? '0.3s' : null)};
      }

      & .moon > circle {
        transition-delay: ${({ theme: { isDark } }) => (isDark ? '0.3s' : null)};
        transition-duration: ${({ theme: { isDark } }) => (isDark ? '0.5s' : null)};
      }
    }
  }

  .theme-toggle {
    background: none;
    border: none;
    margin: 2px 8px 0px;
    padding: 0;

    inline-size: 2rem;
    block-size: 2rem;
    aspect-ratio: 1;
    border-radius: var(--borders-radius-round);

    cursor: pointer;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;

    outline-offset: 5px;
    height: 24px;
    width: 24px;

    & > svg {
      inline-size: 70%;
      block-size: 70%;
      stroke-linecap: round;
      margin: auto;
    }
  }
`;

const ThemeButton = () => {
  const [isDark, setIsDark] = useRecoilState(isDarkState);

  const onClick = () => {
    setIsDark((prev: boolean) => !prev);
  };

  return (
    <Wrapper>
      <button
        type="button"
        className="theme-toggle"
        id="theme-toggle"
        title="트라이 캐치 light & dark"
        aria-label="auto"
        aria-live="polite"
        onClick={onClick}
      >
        <svg className="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
          <mask className="moon" id="moon-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <circle cx="24" cy="10" r="6" fill="black" />
          </mask>
          <circle
            className="sun"
            cx="12"
            cy="12"
            r="6"
            mask="url(#moon-mask)"
            fill="currentColor"
          />
          <g className="sun-beams" stroke="currentColor">
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </g>
        </svg>
      </button>
    </Wrapper>
  );
};

export default ThemeButton;
