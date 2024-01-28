import { Dispatch, ReactNode, SetStateAction } from "react";
import classNames from "classnames/bind";
import style from "./Button.module.scss";

const cx = classNames.bind(style);

interface ButtonProps {
  className?: string;
  buttonAction?: Dispatch<SetStateAction<string>> | (() => void);
  // buttonAction?: Dispatch<SetStateAction<string>>;
  children?: string | ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  value?: string;
  name?: string;
}

const Button = ({
  className,
  buttonAction,
  children,
  disabled,
  value,
  name,
  type = "button",
}: ButtonProps) => {
  function handleClick() {
    console.log("clicked");
    if (buttonAction) {
      buttonAction("someValue");
    }
  }

  return (
    <div className={cx(className)}>
      <button
        name={name}
        // eslint-disable-next-line react/button-has-type
        type={type || "button"}
        value={value}
        disabled={disabled}
        className={cx(`${disabled && "disabled"}`)}
        onClick={handleClick}
      >
        {children}
      </button>
    </div>
  );
};

export { Button };
