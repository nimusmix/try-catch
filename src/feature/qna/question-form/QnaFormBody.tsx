import React from 'react';
import QnaFormTitleSection from './QnaFormTitleSection';
import QnaFormContentSection from './QnaFormContentSection';
import QnaFormErrorCodeSection from './QnaFormErrorCodeSection';
import QnaFormTagSection from './QnaFormTagSection';

const QnaFormBody = () => {
  return (
    <div>
      <QnaFormTitleSection />
      <QnaFormContentSection />
      <QnaFormErrorCodeSection />
      <QnaFormTagSection />
    </div>
  );
};

export default QnaFormBody;
