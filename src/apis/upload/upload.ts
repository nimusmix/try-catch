import { authApi } from '../../utils/axios-instance';

export const postImage = (data: File) => authApi.post('https://image.try-catch.kr/ui', data);
