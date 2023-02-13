import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { IconBellFill } from '../../components/icons/Icons';
import { MiniTitle, Paragraph } from '../../components';
import { isDarkState } from '../../recoil';
import notificationsState from '../../recoil/notificationsState';
import NoticeItem from './NoticeItem';

const Alert = styled.span``;

const NoticeDropdown = styled.button<{ noticeCount: number }>`
  border: none;
  outline: none;
  position: relative;
  & > ${Alert} {
    position: relative;
    width: 0.5rem;
    height: 0.5rem;
    ${({ noticeCount }) =>
      noticeCount > 0 &&
      `&:before {
      content: '';
      position: absolute;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: var(--borders-radius-round);
      background-color: tomato;
    }`}
  }
`;

const DropContainer = styled.div`
  position: absolute;
  border-radius: var(--borders-radius-base);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  min-width: 480px;
  max-width: 480px;
  top: 2rem;
  right: -4rem;
  margin-top: 4px;
  display: none;
  background-color: ${({ theme: { bgColor } }) => bgColor};
  border: none;
  padding: 1rem 0.5rem 1rem 1.2rem;

  ${NoticeDropdown}:focus & {
    display: block;
  }

  ul {
    width: 100%;
  }

  h3 {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .title {
    display: flex;
    svg {
      font-size: 1.5rem;
      translate: 0 4px;
    }
  }

  .desc {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.5rem;

    .count {
      color: var(--colors-brand-500);
      margin-right: 0.2rem;
    }

    .all {
      font-size: 1.1rem;
      color: var(--colors-brand-500);
      font-weight: 500;
      margin-right: 1rem;
      padding: 0.1rem 0.25rem;
      border-radius: var(--borders-radius-base);

      &:hover {
        background-color: var(--colors-brand-500);
        color: var(--colors-white-500);
      }
    }
  }
`;

const DropUl = styled.ul`
  list-style: none;
  line-height: 1.75rem;
  min-height: 200px;
  max-height: 200px;
  overflow-y: scroll;
`;

const NoticeBell = () => {
  const isDark = useRecoilValue(isDarkState);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useRecoilState(notificationsState);

  return (
    <div style={{ cursor: 'pointer' }}>
      <NoticeDropdown noticeCount={notifications.length}>
        <Alert>
          <IconBellFill
            color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
            size="20"
          />
        </Alert>
        <DropContainer>
          <div className="title">
            <MiniTitle sizeType="2xl" textAlign="left">
              알림
            </MiniTitle>
            <IconBellFill color="var(--colors-brand-500)" />
          </div>
          <div className="desc">
            <MiniTitle sizeType="xl" textAlign="left">
              새로운 알림이 <em className="count">N</em>개 있어요
            </MiniTitle>
            <Paragraph sizeType="lg" textAlign="right" className="all">
              모두 읽음
            </Paragraph>
          </div>
          <DropUl id="notice-list">
            {notifications.map((notice) => {
              return (
                <NoticeItem
                  key={notice.id}
                  id={notice.id}
                  from={notice.from}
                  title={notice.title}
                  timestamp={notice.timestamp}
                  type={notice.type}
                />
              );
            })}
          </DropUl>
        </DropContainer>
      </NoticeDropdown>
    </div>
  );
};

export default NoticeBell;
