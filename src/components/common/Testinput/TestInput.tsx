// import { string, bool } from "prop-types";
import { InputHTMLAttributes, MutableRefObject } from "react";
import styles from "./TestInput.module.scss";

interface TestInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string; // 아이디
  label: string; // 레이블
  placeholder?: string; // 플레이스홀더
  readonly?: boolean; // 읽기전용 상태
  disabled?: boolean; // 비활성 상태
  error?: string; // 에러 메시지
  ref: MutableRefObject<HTMLInputElement>;
}

const TestInput = ({
  id,
  label,
  placeholder,
  readonly,
  disabled,
  error,
  ref,
  ...others
}: TestInputProps): JSX.Element => {
  console.log(id, label, placeholder, readonly, disabled, error);
  return (
    <div>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        className={styles.input}
        placeholder={placeholder}
        readOnly={readonly}
        disabled={disabled}
        {...others}
        ref={ref}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default TestInput;

TestInput.defaultProps = {
  placeholder: "",
  readonly: false,
  disabled: false,
  error: "",
};
