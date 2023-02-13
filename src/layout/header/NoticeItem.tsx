import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Paragraph } from '../../components';
import { INotification } from '../../recoil/notificationsState';

const DropList = styled.li`
  position: relative;
  padding: 0.75rem 0.5rem;
  margin-right: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: var(--borders-radius-base);
  transition: all 0.2s;
  color: ${({ theme }) => theme.textColor100};

  strong {
    color: var(--colors-brand-500);
  }

  .notice-main {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .notice-title {
    width: 10rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
    margin-right: 0.3rem;
  }

  .notice-time {
    font-weight: 600;
  }

  span {
    display: flex;
    align-items: center;
  }

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-black-400)' : 'var(--colors-brand-200)'};
  }
`;

const Dot = styled.span`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: var(--borders-radius-round);
  background-color: var(--colors-brand-500);
  margin-right: 1rem;
`;
const NoticeItem = ({ from, title, id, type, timestamp }: INotification) => {
  const navigate = useNavigate();
  let onClick;

  if (type === 'follow') {
    onClick = () => navigate(`/proflie/${title}`);
  }

  if (type === 'answerRegistration' || type === 'answerAcceptance') {
    onClick = () => navigate(`/question/${from}`);
  }

  return (
    <DropList onClick={onClick}>
      <div className="notice-main">
        <span>
          <Paragraph sizeType="base" className="notice-title">
            {title}
          </Paragraph>
          {type === 'follow' && (
            <p>
              님이 회원님을 <strong>팔로우</strong>했어요
            </p>
          )}
          {type === 'answerRegistration' && (
            <p>
              글에 누군가<strong>답변</strong>을 남겼어요
            </p>
          )}
          {type === 'answerAcceptance' && (
            <p>
              글에 작성한 답변이 <strong>채택</strong>됐어요!
            </p>
          )}
        </span>
        <Dot />
      </div>
      <Paragraph as="span" sizeType="xm" className="notice-time" color="var(--colors-brand-500)">
        {timestamp}
      </Paragraph>
    </DropList>
  );
};

export default NoticeItem;
