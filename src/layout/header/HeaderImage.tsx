import styled from 'styled-components';
import { media } from '../../utils/media';

interface IHeaderImageProps {
  image: string;
}

const HeaderImage = styled.div<IHeaderImageProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 180px;
  background-image: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-size: cover;
  min-width: 100%;

  h2 {
    font-size: 32px;
    color: var(--colors-black-500);
  }

  p {
    color: var(--colors-black-400);
  }

  ${media.phone`
    min-height: 120px;
  `}
`;

export default HeaderImage;
