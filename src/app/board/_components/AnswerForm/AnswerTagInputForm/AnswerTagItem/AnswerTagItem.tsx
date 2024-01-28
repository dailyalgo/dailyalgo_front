import classNames from "classnames/bind";
import style from "./AnswerTagItem.module.scss";

const cx = classNames.bind(style);

interface Props {
  label: string;
  onClick: (tag: string) => void;
  isActive: boolean;
}

const AnswerTagItem = ({ label, onClick, isActive }: Props) => {
  return (
    <div className={cx("tag-item", isActive && "active-tag")} onClick={() => onClick(label)}>
      {label}
    </div>
  );
};

export { AnswerTagItem };
