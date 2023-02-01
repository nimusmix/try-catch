import React, { useState } from "react";
import styled from "styled-components";
import { Dropdown, Input, Paragraph } from "../../../components";
import { Tooltip } from "./QnaFormContentSection";
import { useQuestionDispatch, useQuestionState } from "../../../context/QnaContext";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  input {
    margin-top: 1.5rem;
  }
`;

const TitleTooltip = styled(Tooltip)`
  translate: 110% -20px;
`;

const QnaFormTitleSection = () => {
  const [isTitleFocus, setIsTitleFocus] = useState(false);
  const { title } = useQuestionState();

  const dispatch = useQuestionDispatch();

  const setCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_CATEGORY', category: e.target.value });
  };
  const setTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_TITLE', title: e.target.value });
  };

  return (
    <Wrapper>
      <Dropdown
        items={[
          { text: '개발', value: '개발' },
          { text: '커리어', value: '커리어' },
          { text: '밸런스 게임', value: '밸런스 게임' },
        ]}
        onChange={setCategory}
      />
      <Input
        placeholder="제목을 입력해 주세요"
        width="100%"
        padding="0 0.5rem"
        height="2.5rem"
        value={title}
        onChange={setTitle}
        onFocus={() => setIsTitleFocus(true)}
        onBlur={() => setIsTitleFocus(false)}
      />
      {isTitleFocus && (
        <TitleTooltip>
          <Paragraph sizeType="base">💡 질문 내용 작성 가이드</Paragraph>
          <Paragraph sizeType="base">
            어떤 상황에서 문제가 발생했는지 구체적으로 작성해 주세요. 현재 사용하는 소프트웨어의
            버전 정보까지 포함하시면 더욱 좋은 답변을 받을 수 있습니다.
          </Paragraph>
        </TitleTooltip>
      )}
    </Wrapper>
  );
};

export default QnaFormTitleSection;
