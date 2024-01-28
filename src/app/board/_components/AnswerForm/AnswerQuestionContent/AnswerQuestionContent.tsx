import classNames from "classnames/bind";
import { useState } from "react";
import type { QuestionDetail } from "src/types/question";
import style from "./AnswerQuestionContent.module.scss";
import { QuestionContents } from "../../QuestionDetailForm/components/QuestionContents";

const cx = classNames.bind(style);

interface Props {
  question: QuestionDetail;
}

const AnswerQuestionContent = ({ question }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cx("question-content-wrap")}>
      <div className={cx("question-content", !isOpen && "close-content")}>
        <h1>{question.title}</h1>
        <QuestionContents
          language={question.language}
          code={question.code}
          content={question.content}
        />
      </div>
      <div className={cx("open-close-control-wrap")} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <span>질문 접어두기</span> : <span>질문 전체보기</span>}
      </div>
    </div>
  );
};

export { AnswerQuestionContent };
