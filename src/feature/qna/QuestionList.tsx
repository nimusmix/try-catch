import QuestionItem from './QuestionItem';

export interface ITag {
  id: number;
  tagName: string;
}
export interface IQuestionItemList {
  id: number;
  title: string;
  content: string;
  timestamp: string;
  viewCount: number;
  likeCount: number;
  answerCount: number;
  tags: ITag[];
}

const questionItemList = [
  {
    id: 1,
    title: 'react-hook-form 정규표현식 관리방법',
    content:
      '안녕하세요. react-hook-form을 사용해서 프로젝트를 하고 있습니다. 정규 표현식을\n' +
      'react-hook-form에서 사용할 때 다양한 방법이 있는 것으로 알고 있는데 보통 보통...',
    timestamp: '9분 전',
    viewCount: 12,
    likeCount: 12,
    answerCount: 12,
    tags: [
      { id: 1, tagName: 'react' },
      { id: 2, tagName: 'react-hook-form' },
    ],
  },
  {
    id: 2,
    title: 'react-hook-form 정규표현식 관리방법',
    content:
      '안녕하세요. react-hook-form을 사용해서 프로젝트를 하고 있습니다. 정규 표현식을\n' +
      'react-hook-form에서 사용할 때 다양한 방법이 있는 것으로 알고 있는데 보통 보통...',
    timestamp: '9분 전',
    viewCount: 12,
    likeCount: 12,
    answerCount: 12,
    tags: [
      { id: 1, tagName: 'react' },
      { id: 2, tagName: 'react-hook-form' },
    ],
  },
  {
    id: 3,
    title: 'react-hook-form 정규표현식 관리방법',
    content:
      '안녕하세요. react-hook-form을 사용해서 프로젝트를 하고 있습니다. 정규 표현식을\n' +
      'react-hook-form에서 사용할 때 다양한 방법이 있는 것으로 알고 있는데 보통 보통...',
    timestamp: '9분 전',
    viewCount: 12,
    likeCount: 12,
    answerCount: 12,
    tags: [
      { id: 1, tagName: 'react' },
      { id: 2, tagName: 'react-hook-form' },
    ],
  },
];
const QuestionList = () => {
  return (
    <>
      {questionItemList.map((questionItem) => {
        return <QuestionItem key={questionItem.id} {...questionItem} />;
      })}
    </>
  );
};

export default QuestionList;
