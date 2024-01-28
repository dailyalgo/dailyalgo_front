// import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { ProblemTag } from "@components/icon/ProblemTag";
import { Tag } from "@components/icon/Tag";
import { BasicButton } from "@components/button/BasicButton";
import type { QuestionDetail } from "src/types/question";
import { ProblemType } from "src/types/tag";
import style from "./QuestionCoreInfoBox.module.scss";

const cx = classNames.bind(style);

interface Props {
  question: QuestionDetail;
}

const QuestionCoreInfoBox = ({ question }: Props) => {
  const getPlatform = () => {
    switch (question.source) {
      case "boj":
        return "백준";
      case "programmers":
        return "프로그래머스";
      case "swea":
        return "SWEA";
      case "leetCode":
        return "LeetCode";
      default:
        return "";
    }
  };

  const clickLinkHandler = () => {
    window.open(question.link, "_blank");
  };

  return (
    <div className={cx("question-core-info-box-wrap")}>
      <strong className={cx("problem-name")}>덧셈식 출력하기</strong>
      <dl>
        <div>
          <dt>출처</dt>
          <dd>{getPlatform()}</dd>
        </div>
        <div>
          <dt>질문타입</dt>
          <dd>
            <ProblemTag tagName={question.type as ProblemType} />
          </dd>
        </div>
        <div>
          <dt>태그</dt>
          <dd className={cx("tag-list")}>
            {question.tags.map((tag) => (
              <Tag key={tag.name} label={tag.name} />
            ))}
          </dd>
        </div>
      </dl>
      <div className={cx("btn-wrap")}>
        <BasicButton size="lg" onClick={clickLinkHandler}>
          문제 바로가기
        </BasicButton>
      </div>
    </div>
  );
};

export { QuestionCoreInfoBox };
