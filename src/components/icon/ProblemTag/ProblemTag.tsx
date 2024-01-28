import classNames from "classnames/bind";
import { ProblemType } from "src/types/tag";
import colorMap from "./colorMap";
import style from "./ProblemTag.module.scss";

const cx = classNames.bind(style);

interface Props {
  tagName: ProblemType;
  size?: "sm" | "md" | "lg";
}

const ProblemTag = ({ tagName, size = "md" }: Props) => {
  const getProblem = () => {
    switch (tagName) {
      case "timeOut":
        return "시간초과";
      case "memoryExceed":
        return "메모리 초과";
      case "error":
        return "에러";
      case "solution":
        return "해결방법";
      case "counterExample":
        return "반례요청";
      case "whyWrong":
        return "왜맞틀";
      case "whyRight":
        return "왜틀맞";
      case "etc":
        return "기타";
      default:
        return "";
    }
  };

  return (
    <span
      className={cx("problem-tag-wrap", size && `size-${size}`)}
      style={
        {
          "--tag-color": `${colorMap[tagName]}`,
        } as React.CSSProperties
      }
    >
      {getProblem()}
    </span>
  );
};

export { ProblemTag };
