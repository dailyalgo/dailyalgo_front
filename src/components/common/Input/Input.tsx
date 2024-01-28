import { ChangeEvent, useState } from "react";
import classnames from "classnames/bind";
import styles from "./Input.module.scss";
// import debounce  from "lodash/debounce";

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

  const handleInput = (v: string) => {
    validCheck(v);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (autoRegEx) {
      v = autoRegEx(v);
    }
    setValue(v);
    handleInput(v);
  };

  // const handleInput = useCallback(
  // 	debounce(v => {
  //         validCheck(v)
  // 	}, 500),[]
  // );

  return (
    <div className={cx("input-wrap")}>
      <label htmlFor={labelId} className={styles["labeled-input"]}>
        <span>{labelValue}</span>
        <input
          id={inputId}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          // className={classnames(isError && styles.error)}
        />
      </label>
      {isError && <span className={styles["error-text"]}>{errorText}</span>}
    </div>
  );
};

export { Input };

// Input.defaultProp = {
//   labelId: "",
//   labelValue: "",
//   inputId: "",
//   type: "text",
//   placeholder: "",
//   disabled: false,
//   regEx: RegExp,
//   errorText: "",
// };
