import { FindUserForm } from "@components/FindUser/FindUserForm";
import classNames from "classnames/bind";
import style from "./FindUser.module.scss";

const cx = classNames.bind(style);

const FindUser = () => (
  <div className={cx("page-wrap")}>
    <div className={cx("container")}>
      <FindUserForm />
    </div>
  </div>
);

export default FindUser;
