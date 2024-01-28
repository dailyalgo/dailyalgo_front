import classNames from "classnames/bind";
import style from "./QuestionInfoBox.module.scss";

const cx = classNames.bind(style);

interface Props {
  label: string;
  subLabel?: string;
  children: React.ReactNode;
}

const InputBlock = ({ label, subLabel, children }: Props) => (
  <div className={cx("input-block-wrap")}>
    <strong className={cx("input-label")}>{label}</strong>
    {subLabel && <span className={cx("input-sub-label")}>{subLabel}</span>}
    {children}
  </div>
);

export { InputBlock };
