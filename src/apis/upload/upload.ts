import { imageApi } from '../../utils/axios-instance';

export const postImage = (data: File) =>
  imageApi
    .post('', data, {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    })
    .then((res) => {
      console.log(res.data);
    });
