import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

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

const ul = (index: number) => {
  const underline = document.getElementById('underline') as HTMLDivElement;
  underline.style.transform = `translate3d(0,${index * 100}%,0)`;
};

const NavItem = ({ id, title, link }: ISettingNav) => {
  return (
    <NavLink to={link}>
      <button type="button" onClick={() => ul(id)}>
        {title}
      </button>
    </NavLink>
  );
};

const SettingNav = () => {
  return (
    <Wrapper>
      <nav>
        <div className="underline" id="underline" />
        {SettingNavList.map((item) => (
          <NavItem key={item.id} {...item} />
        ))}
      </nav>
    </Wrapper>
  );
};

export default SettingNav;
