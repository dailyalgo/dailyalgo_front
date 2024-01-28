import classNames from "classnames/bind";
import { SvgIcon } from "@components/icon/SvgIcon";
import style from "./Pagination.module.scss";

const cx = classNames.bind(style);

type Props = {
  totalCnt: number;
  page: number;
  setPage: (page: number) => void;
};

const Pagination = ({ totalCnt, page, setPage }: Props) => {
  const startPage = Math.floor((page - 1) / 10) * 10 + 1;

  const totalPage = Math.ceil(totalCnt / 10);

  const pageBtns = [];
  for (let i = 0; i < 10; i += 1) {
    if (startPage + i > totalPage) {
      break;
    } else {
      pageBtns.push(
        <div
          className={cx("number-btn", { "is-selected": page === startPage + i })}
          onClick={() => setPage(startPage + i)}
          key={`page-${startPage + i}`}
        >
          {startPage + i}
        </div>
      );
    }
  }

  const pageDownClickHandler = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const pageUpClickHandler = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  return (
    <div className={cx("pagination-wrap")}>
      <div className={cx("page-control-btn")} onClick={pageDownClickHandler}>
        <SvgIcon iconName="arrow-triangle" size={16} />
      </div>
      {pageBtns}
      <div className={cx("page-control-btn")} onClick={pageUpClickHandler}>
        <SvgIcon iconName="arrow-triangle" size={16} />
      </div>
    </div>
  );
};

export { Pagination };
