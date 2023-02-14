import React from 'react';
import QnaFormTitleSection from './QnaFormTitleSection';
import QnaFormContentSection from './QnaFormContentSection';
import QnaFormErrorCodeSection from './QnaFormErrorCodeSection';
import QnaFormTagSection from './QnaFormTagSection';
import { useQuestionDispatch, useQuestionState } from '../../../context/QnaContext';

const QnaFormBody = ({ edit }: { edit: boolean }) => {
  const { category } = useQuestionState();
  const dispatch = useQuestionDispatch();

  return (
    <div>
      <QnaFormTitleSection dispatch={dispatch} />
      <QnaFormContentSection dispatch={dispatch} edit={edit} />
      {category === 'DEV' && <QnaFormErrorCodeSection dispatch={dispatch} edit={edit} />}
      <QnaFormTagSection dispatch={dispatch} />
    </div>
  );
};

export default QnaFormBody;
