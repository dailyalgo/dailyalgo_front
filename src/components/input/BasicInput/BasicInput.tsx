import { forwardRef, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent } from "react";
import classNames from "classnames/bind";
import style from "./BasicInput.module.scss";

const cx = classNames.bind(style);

type InputSize = "sm" | "md" | "lg";
type InputType = "text" | "email" | "checkbox" | "radio" | "textarea";

type Props = {
  id: string;
  name?: string;
  title?: string;
  type?: InputType;
  size?: InputSize;
  className?: string;
  disabled?: boolean;
  defaultValue?: string;
  onEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "size">;

const BasicInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      name,
      title,
      type = "text",
      size = "md",
      className = "",
      placeholder,
      onEnter,
      disabled = false,
      defaultValue = "",
      ...props
    },
    ref
  ) => {
    const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && onEnter) {
        onEnter(event);
      }
    };

    return (
      <input
        id={id}
        ref={ref}
        name={name}
        type={type}
        title={title}
        placeholder={placeholder}
        className={cx("common-input", type, className, size && `size-${size}`)}
        aria-required={props.required ? "true" : "false"}
        onKeyDown={handleEnter}
        disabled={disabled}
        defaultValue={defaultValue}
        {...props}
      />
    );
  }
);

BasicInput.displayName = "BasicInput";

export { BasicInput, type Props };
