import React from 'react';
import styled from 'styled-components';
import TagList from '../tags-loop-slider/TagList';
import { SubTitle } from '../../../components';

const Section = styled.section`
  //align-self: flex-start;
  height: 80vh;
  width: 100%;
  display: flex;

  .description {
    flex: 1;
  }
`;

const LastSection = () => {
  return (
    <Section>
      <TagList />
      <div className="description">
        <SubTitle textAlign="right">
          다양한 태그를 통해
          <br />
          검색해보세요
        </SubTitle>
      </div>
    </Section>
  );
};

export default LastSection;
