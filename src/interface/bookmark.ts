const bookmark = () => {};

// {
//     "questionId": 2,
//     "title": "정규식을 통해 이메일주소 삭제하는 방법!",
//     "content": "안녕하세요! 고수님들!\r\n\r\n@okky ,@오키와 같은 리플형식의 닉네임을 데이터 전처리하고 싶은데요\r\n\r\n@가나다라마바사 -> 나다라마바사\r\n\r\n처럼 @와 첫 한글자만 삭제됩니다..\r\n\r\n@가 포함된 단어 자체를 삭제하고 싶은데 방법 부탁드립니다.",
//     "tags": [
//         ""
//     ],
//     "viewCount": 155,
//     "likeCount": 0,
//     "answerCount": 2,
//     "createdAt": 1675031089000
// }
export interface IBookmarkQuestion {
  questionId: number;
  title: string;
  content: string;
  tags: Array<string>;
  likeCount: number;
  answerCount: number;
  viewCount: number;
  createdAt: number;
}

export default bookmark;
