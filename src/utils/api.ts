import axios from 'axios';
// import { useQuery } from 'react-query';

// const BASE_URL = 'https://api.try-catch.duckdns.org/v1';

// export default async function axiosFeedList() {
//   const res = await axios.get(`${BASE_URL}/feed/list`);
//   return res.data;
// }

const api = axios.create({
  baseURL: 'https://api.try-catch.duckdns.org/v1',
});

export const axiosFeedList = () => api.get(`/feed/list`).then((res) => res.data);
export const axiosSearchList = () => api.get('/feed/search?content=react').then((res) => res.data);
