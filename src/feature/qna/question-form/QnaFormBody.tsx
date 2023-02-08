import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import QnaFormTitleSection from './QnaFormTitleSection';
import QnaFormContentSection from './QnaFormContentSection';
import QnaFormErrorCodeSection from './QnaFormErrorCodeSection';
import QnaFormTagSection from './QnaFormTagSection';
import { useQuestionDispatch } from '../../../context/QnaContext';
import { getQuestionDetail } from '../../../apis/qna/qna';
import { IQuestion } from '../../../interface/qna';

const QnaFormBody = () => {
  const dispatch = useQuestionDispatch();
  const queryClient = useQueryClient();
  const { questionId } = useParams();
  const { isLoading } = useQuery<IQuestion>(
    ['question', questionId],
    getQuestionDetail(Number(questionId)),
    {
      onSuccess: (data: IQuestion) => {
        dispatch({ type: 'SET_TITLE', title: data.title });
        dispatch({ type: 'SET_CATEGORY', category: data.category });
        dispatch({ type: 'SET_CONTENT', content: data.content });
        dispatch({ type: 'SET_ERROR_CODE', errorCode: data.errorCode });
        dispatch({ type: 'SET_TAGS', tags: data.tags });
      },

      initialData: () => {
        const questionDetail = queryClient
          .getQueryData<Array<IQuestion>>(['question', `${questionId}`])
          ?.find((question: IQuestion) => question.questionId === Number(questionId));

        return questionDetail;
      },
    }
  );

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  return (
    <div>
      <QnaFormTitleSection dispatch={dispatch} />
      <QnaFormContentSection dispatch={dispatch} />
      <QnaFormErrorCodeSection dispatch={dispatch} />
      <QnaFormTagSection dispatch={dispatch} />
    </div>
  );
};

export default QnaFormBody;
