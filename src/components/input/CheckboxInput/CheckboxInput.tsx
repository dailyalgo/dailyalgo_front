import { useState, useRef, useCallback, ReactNode, useEffect } from "react";
import classNames from "classnames/bind";
import { BasicInput, Props as InputType } from "@components/input/BasicInput";
import { SvgIcon } from "@components/icon/SvgIcon";
import style from "./CheckboxInput.module.scss";

const cx = classNames.bind(style);

interface Props extends Omit<InputType, "onChange"> {
  labelText: ReactNode | string;
  onChange?: (target: HTMLInputElement) => void;
  reverseOrder?: boolean;
  labelHidden?: boolean;
}

const CheckboxInput = ({
  labelText,
  labelHidden = false,
  onChange,
  reverseOrder,
  ...props
}: Props) => {
  const ref = useRef(null);
  const [isChecked, setChecked] = useState(props.checked || false);
  const checkBoxOnChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setChecked(!isChecked);
      const target = event.target as HTMLInputElement;
      if (onChange !== undefined) onChange(target);
    },
    [isChecked, onChange]
  );

  useEffect(() => {
    if (props.checked !== undefined) {
      setChecked(props.checked);
    }
  }, [props.checked]);

  return (
    <span className={cx("checkbox")}>
      <BasicInput
        {...props}
        type="checkbox"
        ref={ref}
        className={cx("checkbox-input")}
        onChange={checkBoxOnChange}
        checked={isChecked}
        disabled={props.disabled}
      />
      <label
        htmlFor={props.id}
        className={cx([reverseOrder && "reverse-order", "label-text-wrap"])}
      >
        <span className={cx("icon")}>
          <SvgIcon iconName="checkbox" size={20} />
        </span>
        <span className={cx("label-text", labelHidden && "a11y")}>{labelText}</span>
      </label>
    </span>
  );
};

export { CheckboxInput };
