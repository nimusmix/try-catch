import { API_URL } from '../constant';

const BASE_URL = `https://${API_URL}/v1`;

export const 연결할주소 = `${BASE_URL}/stream`;
export const sseEvents = new EventSource(연결할주소, { withCredentials: true });
