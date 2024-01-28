"use client";

import { HTMLAttributeAnchorTarget, ReactElement } from "react";
import Link from "next/link";

import classNames from "classnames/bind";
import style from "./IconButton.module.scss";

const cx = classNames.bind(style);

type Props = {
  title: string;
  icon: ReactElement;
  type?: "basic" | "circle";
  size?: number;
  disabled?: boolean;
  href?: string;
  linkTarget?: HTMLAttributeAnchorTarget;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  actionType?: Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">["type"];
  className?: string;
  customColor?: {
    color: string;
    hover: string;
  };
};

const IconButton = ({
  icon,
  type = "basic",
  size = 38,
  disabled,
  href,
  linkTarget,
  onClick,
  actionType = "button",
  title,
  customColor,
  className,
}: Props) => {
  const setStyle = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const css = {} as any;
    if (customColor) {
      css["--icon-color"] = style[customColor.color] as React.CSSProperties;
      css["--icon-hover-color"] = style[customColor.hover] as React.CSSProperties;
    }
    css["--icon-size"] = `--icon-size: ${size}px` as React.CSSProperties;
    return css as React.CSSProperties;
  };
  return href ? (
    <Link
      href={href}
      className={
        (cx("btn-icon", `btn-${type}`, { disabled }, customColor && "custom-icon"), className)
      }
      target={linkTarget && linkTarget}
      rel={linkTarget && "noopener noreferrer"}
      onClick={onClick}
      style={setStyle()}
    >
      {icon}
      <span className={cx("a11y")}>{title}</span>
    </Link>
  ) : (
    <button
      // TODO: 임시방편 Lint 에러 해결
      // eslint-disable-next-line react/button-has-type
      type={actionType || "button"}
      className={(cx("btn-icon", `btn-${type}`, customColor && "custom-icon"), className)}
      disabled={disabled}
      onClick={onClick}
      style={setStyle()}
    >
      {icon}
      <span className={cx("a11y")}>{title}</span>
    </button>
  );
};

export { IconButton };
