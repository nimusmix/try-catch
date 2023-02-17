import { AxiosResponse } from 'axios';
import { imageApi } from '../../utils/axios-instance';

interface IImageResponse {
  bucket_id: number;
  checksum: number;
  image_id: string;
  images: [
    {
      sizing_id: number;
    }
  ];
  io_time: number;
  processing_time: number;
}

export const postImage = (data: File) =>
  imageApi
    .post('', data, {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    })
    .then((res: AxiosResponse<IImageResponse>) => {
      const imageId = res.data.image_id;
      const src = `https://image.try-catch.kr/v1/images/bucket/${imageId}`;

      return src;
    });
