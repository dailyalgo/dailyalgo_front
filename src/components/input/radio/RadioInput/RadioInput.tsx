import { useRef, ReactNode, ChangeEventHandler } from "react";
import classNames from "classnames/bind";
import { BasicInput, Props as InputType } from "../../BasicInput";
import style from "./RadioInput.module.scss";

const cx = classNames.bind(style);

interface Props extends Omit<InputType, "onChange"> {
  labelText: ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name: string;
  value: string;
}

const RadioInput = ({ labelText, onChange, name, value, ...props }: Props) => {
  const ref = useRef(null);

  return (
    <span className={cx("radio-button")}>
      <BasicInput
        {...props}
        name={name}
        value={value}
        type="radio"
        ref={ref}
        className={cx("radio-input")}
        onChange={onChange}
        checked={props.checked}
        disabled={props.disabled}
        readOnly={props.readOnly}
        id={props.id}
      />
      <label htmlFor={props.id}>
        <span className={cx("radio-circle")} />
        <span className={cx("label-text")}>{labelText}</span>
      </label>
    </span>
  );
};

export { RadioInput };
