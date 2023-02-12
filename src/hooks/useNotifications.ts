import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { logOnDev } from '../utils/logging';
import { accToken, isLoggedInState } from '../recoil';
import { API_URL } from '../constant';

const useNotifications = () => {
  const isLoggined = useRecoilValue(isLoggedInState);
  const acc = useRecoilValue(accToken);
  const [followNotifications, setFollowNotifications] = useState([]);
  const [answerAcceptanceNotifications, setAnswerAcceptanceNotifications] = useState([]);
  const [answerRegistrationNotifications, setAnswerRegistrationNotifications] = useState([]);

  const BASE_URL = `https://${API_URL}/v1`;
  const notificationURL = `${BASE_URL}/connect?token=${acc}`;

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isLoggined) {
      let sseEvents: EventSource;
      const fetchSSE = async () => {
        try {
          // 이벤트를 전달 받기 위해서 서버로 접속을 시작하려면 우선, 이벤트를 생성하는 서버측 스크립트를 URI로 지정하여 새로운 EventSource 객체를 생성한다
          // EventSource 생성자에 전달 된 URL이 절대 URL 인 경우 해당 출처 (scheme, domain, port)가 호출 페이지의 출처와 일치해야 한다.
          sseEvents = new EventSource(notificationURL, {
            withCredentials: true,
          });
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
            console.log(data);
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
        } catch (error) {
          logOnDev.log(error);
        }
      };

      fetchSSE();
      return () => {
        sseEvents.close();
      };
    }
  }, [acc, isLoggined, notificationURL]);

  return { followNotifications, answerAcceptanceNotifications, answerRegistrationNotifications };
};

export default useNotifications;
