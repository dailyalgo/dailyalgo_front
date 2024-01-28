import classNames from "classnames/bind";
import style from "./PlatformTag.module.scss";

const cx = classNames.bind(style);

interface Props {
  platform: string;
}

const PlatformTag = ({ platform }: Props) => {
  if (!platform) return null;

  const getPlatform = () => {
    switch (platform) {
      case "boj":
        return "백준";
      case "programmers":
        return "프로그래머스";
      case "swea":
        return "SWEA";
      case "leetCode":
        return "LeetCode";
      default:
        return "";
    }
  };

  return <span className={cx("platform-tag-wrap")}>{getPlatform()}</span>;
};
export { PlatformTag };
