import axios, { AxiosResponse } from 'axios';

const IMAGE_SERVER_URL = `https://image.try-catch.kr/v1/images/bucket`;

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
  axios
    .post(`${IMAGE_SERVER_URL}?format=png`, data, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then((res: AxiosResponse<IImageResponse>) => {
      const imageId = res.data.image_id;
      const src = `${IMAGE_SERVER_URL}/${imageId}`;

      return src;
    });
