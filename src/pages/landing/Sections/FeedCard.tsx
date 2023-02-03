import React from 'react';
import styled from 'styled-components';
import { Button, Card, MiniTitle, Paragraph } from '../../../components';
import getImageUrl from '../../../utils/getImageUrl';

interface IFeedCard {
  title: string;
  content: string;
  company: string;
  tags: Array<{ id: number; tagName: string }>;
}

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  img {
    width: 44px;
    padding: 0.2rem;
    background-color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-brand-100)' : 'var(--colors-white-500)'};
    border-radius: var(--borders-radius-lg);
    box-shadow: ${({ theme: { isDark } }) =>
      isDark
        ? 'rgba(39, 110, 226, 0.2) 0px 0px 0px 2px, rgba(39, 110, 226, 0.3) 0px 4px 6px -1px, rgba(39, 110, 226, 0.08) 0px 1px 0px inset;'
        : 'rgba(0, 0, 0, 0.16) 0px 1px 4px'};
    translate: 1rem;
  }
`;

const CardBody = styled.div`
  margin-bottom: 0.75rem;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const TagsWrapper = styled.div`
  & > span {
    display: inline-block;
    margin-right: 0.5rem;
  }
`;
const FeedCard = ({ title, content, company, tags }: IFeedCard) => {
  return (
    <Card width="25%">
      <CardHeader>
        <MiniTitle sizeType="xl" textAlign="left" margin="0.4rem 0 0 0">
          {title}
        </MiniTitle>
        <img src={getImageUrl(company, 'logo', 'png')} alt={company} />
      </CardHeader>
      <CardBody>
        <Paragraph sizeType="base" textAlign="left">
          {content}
        </Paragraph>
      </CardBody>
      <CardFooter>
        <TagsWrapper>
          {tags.map(({ id, tagName }: { id: number; tagName: string }) => (
            <Button
              key={id}
              as="span"
              designType="blueEmpty"
              color="var(--colors-brand-500)"
              fontSize="var(--fonts-body-xm)"
              padding="2px 10px"
              borderRadius="var(--borders-radius-base)"
            >
              {tagName}
            </Button>
          ))}
        </TagsWrapper>
      </CardFooter>
    </Card>
  );
};

export default FeedCard;
