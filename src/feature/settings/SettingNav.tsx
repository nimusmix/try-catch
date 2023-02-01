import styled from 'styled-components';

const Wrapper = styled.div`
  /* :root {
    --underline-height: 0.5rem;
    --transition-duration: 0.5s;
  } */

  nav {
    position: relative;
    white-space: nowrap;
    background: white;
    padding: 0.5rem 0; // var(--underline-height) 0;
    margin: 2em 0;
    box-shadow: 0 1em 2em rgba(black, 0.05);
  }

  .underline {
    display: block;
    position: absolute;
    z-index: 0;
    top: 0.5rem;
    left: 0;
    height: 0.5rem; // var(--underline-height);
    width: 0.25rem;
    background: black;
    pointer-events: none;
    mix-blend-mode: multiply;
    //transition: transform var(--transition-duration) ease-in-out;
    transition: transform 0.5s ease-in-out;
  }

  button {
    display: inline-block;
    z-index: 10;
    width: 80%;
    padding: 1rem 4rem;
    text-align: center;
    cursor: pointer;
  }

  nav.black {
    .underline {
      background: #222;
      border-radius: 0.25em;
      height: 56px; //calc(0.5rem / 2); //calc(var(--underline-height) / 2);
      mix-blend-mode: initial;
    }
  }
`;

const SettingNav = () => {
  const ul = (index: number) => {
    // console.log(`click!${index}`);

    const underlines = Array.from(
      document.getElementsByClassName('underline') as HTMLCollectionOf<HTMLElement>
    );

    underlines.forEach((item) => {
      const underline = item;
      underline.style.transform = `translate3d(0,${index * 100}%,0)`;
    });
  };

  return (
    <Wrapper>
      <nav className="black" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="underline" />
        <div className="underline" />
        <div className="underline" />

        <button type="button" onClick={() => ul(0)}>
          테마
        </button>
        <button type="button" onClick={() => ul(1)}>
          이메일 알림
        </button>
        <button type="button" onClick={() => ul(2)}>
          고급 기능
        </button>
        <button type="button" onClick={() => ul(3)}>
          소개
        </button>
        <button type="button" onClick={() => ul(4)}>
          고객 센터
        </button>
      </nav>
    </Wrapper>
  );
};

export default SettingNav;
