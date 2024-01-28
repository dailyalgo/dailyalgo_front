import { ChangeEvent, useCallback, useState } from "react";
import classnames from "classnames/bind";
// eslint-disable-next-line import/no-extraneous-dependencies
import debounce from "lodash/debounce";
import styles from "./Input.module.scss";

const cx = classnames.bind(styles);

interface InputProps {
  labelId?: string;
  labelValue?: string;
  inputId?: string;
  type?: string;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  regEx?: RegExp;
  autoRegEx?: (value: string) => string;
  errorText?: string;
}

const Input = ({
  labelId,
  labelValue,
  inputId,
  type,
  value,
  setValue,
  placeholder,
  disabled,
  regEx,
  autoRegEx,
  errorText,
}: InputProps) => {
  const [isError, setIsError] = useState<boolean>(false);

  const validCheck = (text: string) => {
    if (text && regEx) {
      const isValid = regEx.test(text);
      setIsError(!isValid);
    }
  };

  // const handleInput = (v: string) => {
  //   validCheck(v);
  // };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleInput = useCallback(
    debounce((v) => {
      validCheck(v);
    }, 500),
    []
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (autoRegEx) {
      v = autoRegEx(v);
    }
    setValue(v);
    handleInput(v);
  };

  return (
    <div className={cx("input-wrap")}>
      <label htmlFor={labelId} className={cx("labeled-input")}>
        <span>{labelValue}</span>
        <input
          id={inputId}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          className={cx(isError && styles.error)}
        />
      </label>
      {isError && <span className={cx("error-text")}>{errorText}</span>}
    </div>
  );
};

export { Input };
