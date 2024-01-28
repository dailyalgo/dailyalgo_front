import { SignUpForm } from "src/components/SignUp/SignUpForm";
import classNames from "classnames/bind";
import style from "./SignUp.module.scss";

const cx = classNames.bind(style);

const SignUp = () => (
  <div className={cx("page-wrap")}>
    <div className={cx("container")}>
      <h1>회원가입</h1>
      <SignUpForm />
    </div>
  </div>
);

export default SignUp;
