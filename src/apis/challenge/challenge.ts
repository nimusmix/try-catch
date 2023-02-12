// 챌린지
import { AxiosResponse } from 'axios';
import { IChallengeItem } from '../../interface/challenge';
import { authApi } from '../../utils/axios-instance';

export const getChallengeList = async () =>
  authApi.get('/challenge').then((res: AxiosResponse<Array<IChallengeItem>>) => res.data);

export const postChallenge = (challengeId: number) => () => {
  return authApi.post(`/challenge/${challengeId}`).then((res) => res.status);
};
