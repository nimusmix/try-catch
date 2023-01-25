import styled from 'styled-components';

interface IHeaderImageProps {
  image: string;
}

const HeaderImage = styled.div<IHeaderImageProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 300px;
  background-image: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-size: cover;

  margin-left: calc(-50vw + 50%);

  @media (max-width: 1200px) {
    margin-left: calc(-600px + 50%);
  }

  @media (max-width: 768px) {
    margin: auto;
  }
`;

export default HeaderImage;
