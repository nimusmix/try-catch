import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';
import { Paragraph } from '../../components';
import notificationsState, { INotification } from '../../recoil/notificationsState';
import { putNotification } from '../../apis/notice/notice';

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
    max-width: 10rem;
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
const NoticeItem = ({ from, title, type, timestamp, id }: INotification) => {
  const [notifications, setNotifications] = useRecoilState(notificationsState);
  const navigate = useNavigate();

  const { mutate: readAlert } = useMutation(['notice', 'clear'], putNotification([id]), {
    onSuccess: () => {
      const newNotifications = notifications.filter((notice) => notice.id !== id);
      return setNotifications([...newNotifications]);
    },
  });

  let onClick;

  if (type === 'follow') {
    onClick = () => {
      readAlert();
      navigate(`/profile/${title}`);
    };
  }

  if (type === 'answerRegistration' || type === 'answerAcceptance') {
    onClick = () => {
      readAlert();
      navigate(`/question/${from}`);
    };
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
              ?????? ???????????? <strong>?????????</strong>?????????
            </p>
          )}
          {type === 'answerRegistration' && (
            <p>
              ?????? ????????? <strong>??????</strong>??? ????????????
            </p>
          )}
          {type === 'answerAcceptance' && (
            <p>
              ?????? ????????? ????????? <strong>??????</strong>?????????!
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
