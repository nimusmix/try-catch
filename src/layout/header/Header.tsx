import { useEffect } from 'react';
import styled from 'styled-components';
import {
  header_bookmark,
  header_challenge,
  header_feed,
  header_qna,
  header_roadmap,
} from '../../assets';

const CHALLENGE1 =
  'https://img.freepik.com/free-vector/web-developers-courses-computer-programming-web-design-script-and-coding-study-computer-science-student-learning-interface-structure-components_335657-2542.jpg?w=740&t=st=1675822241~exp=1675822841~hmac=ce0aa3826eb106830a9e869c1e7bf7723e635a08dfd9de3ed259622788b7e628';
const CHALLENGE2 =
  'https://img.freepik.com/free-vector/question-answer-faq-frequently-asked-questions-concepts-websites-social-networks-business-pages-flat-cartoon-vector-illustration_1150-58780.jpg?w=1060&t=st=1675821254~exp=1675821854~hmac=600143208eecb231204a413442e04c0cefcbf207c4ee1e32d0fa1f3f6230a5e8';
const CHALLENGE3 =
  'https://img.freepik.com/free-vector/hand-drawn-illustration-business-planning_52683-76702.jpg?w=826&t=st=1675821325~exp=1675821925~hmac=526dc6fb2c3aef58ee1993af746ce914a4eceffc75889b69cc1b9ea31522a072';
const CHALLENGE4 =
  'https://img.freepik.com/free-vector/students-learning-foreign-language-with-vocabulary_74855-11070.jpg?w=1060&t=st=1675821589~exp=1675822189~hmac=8c12dd0bb40a127e2b80f6a21da79e05715c29c74fad1d18b4e0a1b0af3a20da';
const CHALLENGE5 = 'https://tbc.imgdl.xcache.kinxcdn.com/cdn001/20180227/425593167_main1.jpg';

interface IHeaderProps {
  children: React.ReactNode;
}

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  background-color: ${({ theme: { navColor } }) => navColor};
  opacity: 0.93;
  backdrop-filter: blur(30px);
  padding-right: 2rem;
`;

const Header = ({ children }: IHeaderProps) => {
  const preload = (urls: string[]) => {
    urls.forEach((url) => {
      const img = new Image();
      img.src = `${url}`;
    });
  };

  useEffect(() => {
    preload([
      header_qna,
      header_feed,
      header_roadmap,
      header_challenge,
      header_bookmark,
      CHALLENGE1,
      CHALLENGE2,
      CHALLENGE3,
      CHALLENGE4,
      CHALLENGE5,
    ]);
  }, []);
  return <StyledHeader>{children}</StyledHeader>;
};

export default Header;
