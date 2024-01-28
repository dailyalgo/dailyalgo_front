import classNames from "classnames/bind";
import style from "./NotedBox.module.scss";

const cx = classNames.bind(style);

const NotedBox = () => {
  const notedItems = [
    "문제에 대해 알수 있도록 제목을 작성해 주세요.",
    "문제 정보를 확실히 남겨주시면 좀더 자세한 답변을 받아볼 수 있습니다.",
    "질문 내용은 최대한 자세하게 작성해 주셔야 데일리알고의 동료들이 도와줄 수 있습니다.",
  ];
  return (
    <div className={cx("noted-box-wrap")}>
      <strong className={cx("box-title")}>참고사항</strong>
      <span className={cx("sub-title")}>Steps</span>
      <ul className={cx("noted-list")}>
        {notedItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export { NotedBox };
