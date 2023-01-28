import React from 'react';
import styled from 'styled-components';
import { Button, Card, MiniTitle, Paragraph } from '../../../components';

interface IQnaCard {
  title: string;
  content: string;
  timestamp: number | string;
  tags: Array<{ id: number; tagName: string }>;
}

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
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
const QnaCard = ({ title, content, timestamp, tags }: IQnaCard) => {
  return (
    <Card>
      <CardHeader>
        <MiniTitle sizeType="xl" textAlign="left">
          {title}
        </MiniTitle>
        <Paragraph as="span" sizeType="sm">
          {timestamp}
        </Paragraph>
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

export default QnaCard;
