import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button, Card, MiniTitle, Paragraph } from '../../../components';
import { IconBest, IconHash } from '../../../components/icons/Icons';

interface IQnaCard {
  questionId: number;
  title: string;
  content: string;
  timestamp: number | string;
  tags: Array<string>;
}

const Wrapper = styled(Card)`
  padding-top: 1rem;
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'rgb(46, 52, 64)' : 'rgb(247, 248, 255)'};
  height: 100%;
  min-height: 254px;
  max-height: 254px;
  max-width: 33%;

  .markdown {
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: keep-all; // 문단으로 끊어져서 줄바꿈 됨
  }
  .markdown * {
    background: unset;
    margin: unset;
    font: unset;
    font-size: var(--fonts-body-sm);
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1rem;

  .best {
    svg {
      rotate: -35deg;
      translate: -4px 9px;
    }
  }

  .top {
    display: flex;
    justify-content: space-between;
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
  display: flex;
  flex-wrap: wrap;
  & > span {
    display: inline-flex;
    margin-right: 0.5rem;
  }
`;

const UpperTag = styled(Button)`
  cursor: default;
  &:hover {
    background-color: var(--colors-emph-500);
    color: var(--colors-white-500);
    border: 0.8px var(--colors-emph-500) solid;
  }
`;

const Tag = styled(Button)`
  margin-bottom: 0.1rem;
  border: 1px solid
    ${({ theme: { isDark } }) => (isDark ? 'var(--colors-black-400)' : 'rgb(238 238 238/10)')};
  background-color: ${({ theme: { isDark } }) => (isDark ? 'hsl(220deg 13% 28%)' : '#d6e4fb')};
  color: ${({ theme: { textColor } }) => textColor};
  text-transform: capitalize;
  transition: border 0.2s ease-in, background-color 0.2s ease-in, color 0.2s ease-in;

  .tag-text {
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }

  svg {
    margin-right: 0.1rem;
    color: ${({ theme: { isDark, textColor } }) =>
      isDark ? textColor : 'var(--colors-black-100)'};
    transition: color 0.2s ease-in;
  }

  &:hover svg,
  &:hover {
    color: #f1f1f1;
  }
`;

const QnaCard = ({ title, content, timestamp, tags, questionId }: IQnaCard) => {
  return (
    <Wrapper>
      <Link to={`question/${questionId}`}>
        <CardHeader>
          <div>
            <span className="best">
              <IconBest width="14px" height="14px" />
            </span>
            <div className="top">
              <UpperTag
                designType="purpleFill"
                fontSize="12px"
                padding="0.125rem 0.5rem"
                borderRadius="var(--borders-radius-base)"
                style={{ marginBottom: '0.5rem' }}
              >
                인기
              </UpperTag>
              <Paragraph as="span" sizeType="sm">
                {timestamp}
              </Paragraph>
            </div>
          </div>
          <div>
            <MiniTitle sizeType="xl" textAlign="left">
              {title}
            </MiniTitle>
          </div>
        </CardHeader>
        <CardBody>
          <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown">
            {content}
          </ReactMarkdown>
        </CardBody>
        <CardFooter>
          <TagsWrapper>
            {tags.slice(0, 5).map((tag) => {
              if (tag.length > 0) {
                return (
                  <Tag
                    key={tag}
                    as="span"
                    fontSize="var(--fonts-body-xm)"
                    padding="2px 10px"
                    borderRadius="var(--borders-radius-lg)"
                  >
                    <IconHash />
                    <span className="tag-text">{tag}</span>
                  </Tag>
                );
              }
              return null;
            })}
            {tags.length > 5 && (
              <Tag
                as="span"
                fontSize="var(--fonts-body-xm)"
                padding="2px 10px"
                borderRadius="var(--borders-radius-lg)"
              >
                <span className="tag-text">+ {tags.length - 5}</span>
              </Tag>
            )}
          </TagsWrapper>
        </CardFooter>
      </Link>
    </Wrapper>
  );
};

export default QnaCard;
