import React from 'react';
import { useQuery } from 'react-query';
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
  const { questionId } = useParams();
  const { isLoading } = useQuery<IQuestion>(
    ['question', questionId],
    getQuestionDetail(Number(questionId)),
    {
      onSuccess: (data) => {
        dispatch({ type: 'SET_TITLE', title: data.title });
        dispatch({ type: 'SET_CATEGORY', category: data.category });
        dispatch({ type: 'SET_CONTENT', content: data.content });
        dispatch({ type: 'SET_ERROR_CODE', errorCode: data.errorCode });
        dispatch({ type: 'SET_TAGS', tags: data.tags });
      },
    }
  );

  if (isLoading) {
    return 'loading...';
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
