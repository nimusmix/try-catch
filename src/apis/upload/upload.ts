import { authApi } from '../../utils/axios-instance';

export const postImage = (data: File) =>
  authApi
    .post(`/images/question`, data, {
      headers: {
        'Content-Type': 'image/png',
      },
    })
    .then((res) => res.data);
