import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import QnaFormTitleSection from './QnaFormTitleSection';
import QnaFormContentSection from './QnaFormContentSection';
import QnaFormErrorCodeSection from './QnaFormErrorCodeSection';
import QnaFormTagSection from './QnaFormTagSection';
import { useQuestionDispatch } from '../../../context/QnaContext';
import { getQuestionDetail } from '../../../apis/qna/qna';
import { IQuestion } from '../../../interface/qna';
import { accToken } from '../../../recoil';
import tokenDecode from '../../../utils/tokenDecode';

const QnaFormBody = () => {
  const dispatch = useQuestionDispatch();
  const acc = useRecoilValue(accToken);
  const navigate = useNavigate();
  const { questionId } = useParams();
  const { isLoading } = useQuery<IQuestion>(
    ['question', questionId],
    getQuestionDetail(Number(questionId)),
    {
      onSuccess: (data: IQuestion) => {
        if (acc) {
          if (data.author.userId !== tokenDecode(acc, 'id')) {
            navigate(-1);
          }
        }
        dispatch({ type: 'SET_TITLE', title: data.title });
        dispatch({ type: 'SET_CATEGORY', category: data.category });
        dispatch({ type: 'SET_CONTENT', content: data.content });
        dispatch({ type: 'SET_ERROR_CODE', errorCode: data.errorCode });
        dispatch({ type: 'SET_TAGS', tags: data.tags });
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
