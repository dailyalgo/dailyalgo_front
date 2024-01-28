import { useCallback, ComponentProps } from "react";
import classNames from "classnames/bind";
import { RadioInput } from "../RadioInput";
import style from "./RadioGroup.module.scss";

const cx = classNames.bind(style);

interface Props {
  optionArray: ComponentProps<typeof RadioInput>[];
  onChange: ((target: HTMLInputElement) => void) | undefined;
  defaultValue?: string;
  className?: string;
  id?: string;
  readOnly?: boolean;
  disabled?: boolean;
}

const RadioGroup = ({
  optionArray,
  onChange,
  className,
  defaultValue,
  id,
  readOnly,
  disabled,
}: Props) => {
  const radioGroupOnChange = useCallback(
    (target: HTMLInputElement) => {
      if (onChange !== undefined) onChange(target);
    },
    [onChange]
  );

  const radioOnChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const target = event.target as HTMLInputElement;
      radioGroupOnChange(target);
    },
    [radioGroupOnChange]
  );

  return (
    <div className={cx("group-wrap", className && `${className}`, readOnly && "read-only")}>
      {optionArray.map((el) => (
        <span className={cx("wrap")} key={el.id}>
          <RadioInput
            {...el}
            onChange={radioOnChange}
            checked={defaultValue === el.value}
            disabled={disabled}
            readOnly={readOnly}
            {...(id ? { id } : {})}
          />
        </span>
      ))}
    </div>
  );
};

export { RadioGroup };
