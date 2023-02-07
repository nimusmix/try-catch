import { API_URL } from '../constant';

const BASE_URL = `https://${API_URL}/v1`;

export const 연결할주소 = `${BASE_URL}/stream`;

// 이벤트를 전달 받기 위해서 서버로 접속을 시작하려면 우선, 이벤트를 생성하는 서버측 스크립트를 URI로 지정하여 새로운 EventSource 객체를 생성한다
// EventSource 생성자에 전달 된 URL이 절대 URL 인 경우 해당 출처 (scheme, domain, port)가 호출 페이지의 출처와 일치해야 한다.
export const sseEvents = new EventSource(연결할주소, {
  withCredentials: true,
});
