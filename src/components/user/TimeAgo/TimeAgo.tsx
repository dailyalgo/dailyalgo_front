import classNames from "classnames/bind";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

import style from "./TimeAgo.module.scss";

dayjs.locale("ko");
dayjs.extend(relativeTime);
const cx = classNames.bind(style);

interface Props {
  time: Date | string;
}

function timeAgoParser(timeString: string | Date) {
  const parsedTime = dayjs(timeString);
  const adjustedTime = parsedTime.subtract(9, "hour");

  const currentTime = dayjs();
  return adjustedTime.from(currentTime);
}

const TimeAgo = ({ time }: Props) => <span className={cx("time-ago")}>{timeAgoParser(time)}</span>;

export { TimeAgo };
