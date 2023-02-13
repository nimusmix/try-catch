import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IconBellFill } from '../../components/icons/Icons';
import { MiniTitle, Paragraph } from '../../components';
import { isDarkState } from '../../recoil';
import notificationsState from '../../recoil/notificationsState';
import elapsedTime from '../../utils/elapsed-time';

const Alert = styled.span``;

const NoticeDropdown = styled.button`
  border: none;
  outline: none;
  position: relative;
  & > ${Alert} {
    position: relative;
    width: 0.5rem;
    height: 0.5rem;
    &:before {
      content: '';
      position: absolute;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: var(--borders-radius-round);
      background-color: tomato;
    }
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

const NoticeBell = () => {
  const isDark = useRecoilValue(isDarkState);
  const [notifications, setNotifications] = useRecoilState(notificationsState);
  return (
    <div style={{ cursor: 'pointer' }}>
      <NoticeDropdown>
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
            <DropList>
              <div className="notice-main">
                <span>
                  <Paragraph sizeType="base" className="notice-title">
                    가나다라마바사아자차카타파하
                  </Paragraph>
                  <p>
                    님이 회원님을 <strong>팔로우</strong>했어요
                  </p>
                </span>
                <Dot />
              </div>
              <Paragraph
                as="span"
                sizeType="xm"
                className="notice-time"
                color="var(--colors-brand-500)"
              >
                {elapsedTime(189239023)}
              </Paragraph>
            </DropList>
            <DropList>
              <div className="notice-main">
                <span>
                  <Paragraph sizeType="base" className="notice-title">
                    asddasdasasdadasdasdasdsadsad
                  </Paragraph>
                  <p>
                    글에 <strong>답변</strong>이 달렸어요
                  </p>
                </span>
                <Dot />
              </div>
              <Paragraph
                as="span"
                sizeType="xm"
                className="notice-time"
                color="var(--colors-brand-500)"
              >
                {elapsedTime(189239023)}
              </Paragraph>
            </DropList>
            <DropList>
              <div className="notice-main">
                <span>
                  <Paragraph sizeType="base" className="notice-title">
                    asddasdasasdadasdasdasdsadsad
                  </Paragraph>
                  <p>
                    글에 남긴 답변이 <strong>채택</strong>됐어요!
                  </p>
                </span>
                <Dot />
              </div>
              <Paragraph
                as="span"
                sizeType="xm"
                className="notice-time"
                color="var(--colors-brand-500)"
              >
                {elapsedTime(189239023)}
              </Paragraph>
            </DropList>
          </DropUl>
        </DropContainer>
      </NoticeDropdown>
    </div>
  );
};

export default NoticeBell;
