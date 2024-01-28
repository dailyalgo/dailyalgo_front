/* eslint-disable react/require-default-props */
import { ChangeEvent, InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  placeholder?: string;
  inputValue: string;
  setInputValue: (inputValue: string) => void;
  classnames?: string;
  maxLength?: number;
}

const Input = ({
  type,
  disabled,
  placeholder,
  inputValue,
  setInputValue,
  classnames,
  maxLength,
}: InputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setInputValue(e.target.value);
  };
  return (
    <div className={styles.inputWrap}>
      <input
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        className={classnames}
        maxLength={maxLength}
      />
    </div>
  );
};

export default Input;
