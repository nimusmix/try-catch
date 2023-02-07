import { useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IRoadmapListItem } from './NewRoadmap';
import { getRoadmapList } from '../../apis/roadmap/roadmap';
import RoadmapListItem from './RoadmapListItem';
import { IconArrowLeft, IconArrowRight } from '../../components/icons/Icons';
import { isDarkState } from '../../recoil';

const PopularRoadmapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const ArrowWrapper = styled.div`
  display: flex;
  margin: 0.25rem 0 0.75rem 0.75rem;

  & :first-child {
    margin-right: 0.75rem;
  }

  svg {
    cursor: pointer;
  }
`;

const ContentWrapper = styled.div`
  overflow-x: hidden;
  width: 952px;
  margin-bottom: 3rem;
`;

const ContentBox = styled.div<{ trans: string }>`
  display: flex;
  translate: ${({ trans }) => trans};
  transition: translate 0.5s;
`;

const PopularRoadmap = () => {
  // 나중에 인기 로드맵 리스트 api로 수정하기
  const { data: popularRoadmapList } = useQuery<Array<IRoadmapListItem>>(
    ['roadmapList'] as const,
    () => getRoadmapList()
  );
  const [translateState, setTranslateState] = useState(0);
  const isDark = useRecoilValue(isDarkState);

  return (
    <PopularRoadmapWrapper>
      <ArrowWrapper>
        <IconArrowLeft
          onClick={() => setTranslateState(0)}
          color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
          size={18}
        />
        <IconArrowRight
          onClick={() => setTranslateState(-50)}
          color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
          size={18}
        />
      </ArrowWrapper>
      <ContentWrapper>
        <ContentBox trans={`${translateState}%`}>
          {popularRoadmapList?.map((roadmap) => (
            <Link to={`/roadmap/${roadmap.author.userName}`} key={roadmap.author.userId}>
              <RoadmapListItem roadmap={roadmap} />
            </Link>
          ))}
        </ContentBox>
      </ContentWrapper>
    </PopularRoadmapWrapper>
  );
};

export default PopularRoadmap;
