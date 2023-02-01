import React from 'react';
import QnaFormTitleSection from './QnaFormTitleSection';
import QnaFormContentSection from './QnaFormContentSection';
import QnaFormErrorCodeSection from './QnaFormErrorCodeSection';
import QnaFormTagSection from './QnaFormTagSection';
import QuestionProvider from '../../../context/QnaContext';

const QnaFormBody = () => {
  return (
    <div>
      <QuestionProvider>
        <QnaFormTitleSection />
        <QnaFormContentSection />
        <QnaFormErrorCodeSection />
        <QnaFormTagSection />
      </QuestionProvider>
    </div>
  );
};

export default QnaFormBody;
