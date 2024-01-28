import classNames from "classnames/bind";
import style from "./Tag.module.scss";

const cx = classNames.bind(style);

interface Props {
  label: string;
  onClick?: () => void;
}

const Tag = ({ label, onClick }: Props) => {
  const Root = onClick ? "button" : "span";

  return (
    <Root className={cx("tag")} onClick={onClick}>
      {label}
    </Root>
  );
};

export { Tag };
