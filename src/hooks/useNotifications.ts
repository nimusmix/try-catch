import { useEffect, useState } from 'react';
import { sseEvents } from '../utils/sse';
import { logOnDev } from '../utils/logging';

const useNotifications = () => {
  const [followNotifications, setFollowNotifications] = useState([]);
  const [answerAcceptanceNotifications, setAnswerAcceptanceNotifications] = useState([]);
  const [answerRegistrationNotifications, setAnswerRegistrationNotifications] = useState([]);

  useEffect(() => {
    // connection 되면
    sseEvents.addEventListener('open', (e) => {
      logOnDev.dir(e);
    });
    // error 발생시
    sseEvents.addEventListener('error', (e) => {
      logOnDev.log(e);
    });

    sseEvents.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);
      // switch (data.type) {
      //   // 팔로우
      //   case 'follow':
      //     setFollowNotifications((prevFollowNotifications) => [
      //       ...prevFollowNotifications,
      //       data.message,
      //     ]);
      //     break;
      //
      //   // 답변 채택
      //   case 'answer_acceptance':
      //     setAnswerAcceptanceNotifications((prevAnswerAcceptanceNotifications) => [
      //       ...prevAnswerAcceptanceNotifications,
      //       data.message,
      //     ]);
      //     break;
      //
      //   // 내 글에 답변 등록
      //   case 'answer_registration':
      //     setAnswerRegistrationNotifications((prevAnswerRegistrationNotifications) => [
      //       ...prevAnswerRegistrationNotifications,
      //       data.message,
      //     ]);
      //     break;
      //   default:
      //     break;
      // }
    });

    return () => {
      sseEvents.close();
    };
  }, []);

  return { followNotifications, answerAcceptanceNotifications, answerRegistrationNotifications };
};

export default useNotifications;
