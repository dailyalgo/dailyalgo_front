import classNames from "classnames/bind";
import { reduxAppSelector } from "src/redux/store";
import { IconButton } from "@components/button/IconButton";
import { SvgIcon } from "@components/icon/SvgIcon";
import { Tag } from "@components/icon/Tag";
import { TimeAgo } from "@components/user/TimeAgo";
import { useRouter } from "next/navigation";
import type { QuestionItem } from "src/types/question";
import { requestScrapQuestion } from "src/api/Question";
import { toast } from "react-toastify";
import style from "./MyPageQuestionItem.module.scss";

const cx = classNames.bind(style);

interface Props {
  question: QuestionItem;
  onClickScrap: (idx: number) => void;
  idx: number;
}

const MyPageQuestionItem = ({ question, onClickScrap, idx }: Props) => {
  const { isLogIn } = reduxAppSelector((state) => state.authReducer.value);
  const router = useRouter();

  const clickScrapHandler = async () => {
    if (!isLogIn) {
      toast.warning("로그인이 필요한 서비스입니다.");
      return;
    }

    try {
      await requestScrapQuestion(question.id);
      onClickScrap(idx);
    } catch (e) {
      toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  const goToDetail = () => {
    router.push(`/board/detail/${question.id}`);
  };

  return (
    <div className={cx("question-item-wrap")}>
      <IconButton
        icon={<SvgIcon iconName={question.is_scrap ? "solid-tag-on" : "solid-tag-off"} size={24} />}
        title="북마크"
        onClick={clickScrapHandler}
      />
      <div className={cx("question-contents-wrap")}>
        <div className={cx("question-contents-top")}>
          <span className={cx("question-title")} onClick={goToDetail}>
            {question.title}
          </span>
          <div className={cx("content-right")}>
            <TimeAgo time={question.question_created_time} />
          </div>
        </div>

        <div className={cx("question-tags")}>
          {question.tags.length > 0 &&
            question.tags.map((tag) => (
              <Tag label={tag.name} key={`question-${question.id}-${tag.name}`} />
            ))}
        </div>
      </div>
    </div>
  );
};

export { MyPageQuestionItem };
