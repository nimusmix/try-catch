import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';

const Wrapper = styled.div`
  nav {
    position: relative;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    border-left: 1px solid;
    border-color: ${({ theme: { borderColor } }) => borderColor};
  }

  .underline {
    display: block;
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    height: 62px;
    width: 0.25rem;
    pointer-events: none;
    transition: transform 0.5s ease-in-out;
    background: var(--colors-brand-500);
    border-radius: 0.25em;
    mix-blend-mode: initial;
  }

  button {
    display: inline-block;
    z-index: 10;
    width: 80%;
    padding: 1rem 3rem;
    text-align: left;
    cursor: pointer;
    font-size: var(--fonts-desktop-heading-xl);
  }

  a {
    &:hover {
      background-color: ${({ theme: { isDark } }) =>
        isDark ? 'var(--colors-black-400)' : 'var(--colors-white-400)'};
    }
    &.active {
      color: var(--colors-brand-500);
      box-shadow: ${({ theme: { isDark } }) =>
        isDark
          ? 'rgb(255 255 255 / 6%) 0 0 0 0.05rem, rgb(255 255 255 / 4%) 0 0 1.25rem'
          : 'rgb(8 60 130 / 6%) 0 0 0 0.05rem, rgb(30 34 40 / 4%) 0 0 1.25rem'};
      background-color: ${({ theme: { isDark } }) =>
        isDark ? 'rgba(46, 52, 64, 1)' : 'var(--colors-white-500)'};
    }
  }
`;

const SettingNavList = [
  {
    id: 0,
    link: `/settings/theme`,
    title: '테마',
  },
  {
    id: 1,
    link: `/settings/github`,
    title: '깃허브',
  },
];

interface ISettingNav {
  id: number;
  title: string;
  link: string;
}

const NavItem = ({ title, link }: ISettingNav) => {
  return (
    <NavLink to={link} className={({ isActive }) => (isActive ? 'active' : '')}>
      <button type="button">{title}</button>
    </NavLink>
  );
};

const SettingNav = () => {
  const sampleLocation = useLocation().pathname;
  const index = sampleLocation === SettingNavList[0].link ? 0 : 1;

  return (
    <Wrapper>
      <nav>
        <div
          className="underline"
          id="underline"
          style={{ transform: `translate3d(0,${index * 100}%,0)` }}
        />
        {SettingNavList.map((item) => (
          <NavItem key={item.id} {...item} />
        ))}
      </nav>
    </Wrapper>
  );
};

export default SettingNav;
