import classNames from "classnames/bind";
import style from "./BasicButton.module.scss";

const cx = classNames.bind(style);

type Props = {
  href?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  buttonType?: "primary" | "secondary" | "third" | "tertiary" | "danger" | "link" | "nomal";
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

const BasicButton = ({
  href,
  children,
  type = "button",
  onClick,
  size = "md",
  buttonType = "primary",
  ...props
}: Props) => {
  const element = href ? "a" : "button";
  const Root = element;
  const rootProps = {
    className: cx("btn", `btn-${size}`, `btn-type-${buttonType}`),
    type,
    href,
    onClick,
    ...props,
  };
  return <Root {...rootProps}>{children}</Root>;
};

export { BasicButton };
