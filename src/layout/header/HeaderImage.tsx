import styled from 'styled-components';

interface IHeaderImageProps {
  image: string;
}

const HeaderImage = styled.div<IHeaderImageProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 180px;
  background-image: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;

  h2 {
    font-size: 32px;
    color: var(---colors-black-500);
  }

  p {
    color: var(---colors-black-400);
  }
`;

export default HeaderImage;
