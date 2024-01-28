import classNames from "classnames/bind";
import Link from "next/link";
import style from "./NotFoundLayout.module.scss";

const cx = classNames.bind(style);

const NotFoundLayout = () => {
  return (
    <div className={cx("not-found-wrap")}>
      <img src="/assets/image/error.png" alt="" className={cx("not-found-img")} />
      <div className={cx("text-wrap")}>
        <h1>찾을 수 없는 페이지입니다.</h1>
        <Link href="/" className={cx("link-btn")}>
          메인으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export { NotFoundLayout };
