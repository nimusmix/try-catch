import styled from 'styled-components';

interface IHeaderImageProps {
  image: string;
}

const HeaderImage = styled.div<IHeaderImageProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  background-image: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
`;

export default HeaderImage;
