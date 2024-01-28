// import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { CodeEditor } from "@components/article/CodeEditor";
import style from "./QuestionContents.module.scss";

const cx = classNames.bind(style);

interface Props {
  language: string;
  code: string;
  content: string;
}

const QuestionContents = ({ language, code, content }: Props) => {
  return (
    <div className={cx("question-contents-wrap")}>
      {/* TODO: defaultValue props로 유저 질문 코드 */}
      <div className={cx("code-editor-wrap")}>
        {code && (
          <CodeEditor language={language} customOption={{ readOnly: true }} defaultValue={code} />
        )}
      </div>
      {/* contents 삽입 부분 */}
      <pre className={cx("text")}>{content}</pre>
    </div>
  );
};

export { QuestionContents };
