import React from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import QnaFormTitleSection from './QnaFormTitleSection';
import QnaFormContentSection from './QnaFormContentSection';
import QnaFormErrorCodeSection from './QnaFormErrorCodeSection';
import QnaFormTagSection from './QnaFormTagSection';
import { useQuestionDispatch } from '../../../context/QnaContext';

const QnaFormBody = () => {
  const dispatch = useQuestionDispatch();
  const queryClient = useQueryClient();
  const { questionId } = useParams();

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
