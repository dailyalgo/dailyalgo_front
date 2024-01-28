import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { Pagination } from "@components/common/Pagination/Pagination";
import { fetchUserQuestionsByContent } from "src/api/User";
import type { QuestionItem } from "src/types/question";
import Link from "next/link";
import { MyPageQuestionItem } from "../MyPageQuestionItem";
import style from "./MyPageQuestionList.module.scss";

const cx = classNames.bind(style);

interface Props {
  tab: {
    label: string;
    id: string;
  };
  userId: string;
  pageType: "mypage" | "user";
}

const MyPageQuestionList = ({ tab, userId, pageType }: Props) => {
  const headerText = () => {
    if (tab.id === "answer") return "작성한 답변";
    if (tab.id === "question") return "작성한 질문";
    if (tab.id === "scrap") return "다시보기";
    return undefined;
  };

  const noneQuestionText = () => {
    if (tab.id === "answer") return <span>작성한 답변이 없습니다.</span>;
    if (tab.id === "question") return <span>작성한 질문이 없습니다.</span>;
    return undefined;
  };

  const noneQuestionSubTextInMyPage = () => {
    if (tab.id === "answer")
      return <span>질문에 답변하고 데일리알고 동료들과 정보를 나눠보세요!</span>;
    if (tab.id === "question")
      return <span>질문을 작성하고 데일리알고 동료들과 정보를 나눠보세요!</span>;
    if (tab.id === "scrap") return <span>다시보기를 통해 질문을 저장해보세요!</span>;
    return undefined;
  };

  const [totalCnt, setTotalCnt] = useState(0);
  const [questionList, setQuestionList] = useState<QuestionItem[]>([]);
  const [page, setPage] = useState(1);

  const scrapItem = (idx: number) => {
    const updateQuestionList = [...questionList];

    updateQuestionList[idx].is_scrap = Math.abs(updateQuestionList[idx].is_scrap - 1);
    setQuestionList(updateQuestionList);
  };

  useEffect(() => {
    setPage(1);
  }, [tab]);

  useEffect(() => {
    const getQuestionList = async () => {
      try {
        const offset = (page - 1) * 10;
        const res = await fetchUserQuestionsByContent(userId, tab.id, offset);
        setQuestionList(res.question_list);
        setTotalCnt(res.total_cnt);
      } catch (e) {
        setQuestionList([]);
        setTotalCnt(0);
      }
    };

    getQuestionList();
  }, [page, tab, userId]);

  return (
    <div className={cx("mypage-questions-wrap")}>
      <div className={cx("mypage-questions-header")}>
        <span className={cx("mypage-questions-header-text")}>
          <span className={cx("mypage-questions-header-highlight")}>{totalCnt}개</span>의{" "}
          {headerText()}
        </span>
      </div>

      {questionList.length > 0 ? (
        <>
          <div className={cx("mypage-question-list")}>
            {questionList.map((question, idx) => (
              <MyPageQuestionItem
                question={question}
                key={`${tab}-${question.id}`}
                onClickScrap={scrapItem}
                idx={idx}
              />
            ))}
          </div>
          <Pagination totalCnt={totalCnt} page={page} setPage={setPage} />
        </>
      ) : (
        <div className={cx("mypage-none-result-wrap")}>
          <div className={cx("text-wrap")}>
            {noneQuestionText()}
            {pageType === "mypage" && noneQuestionSubTextInMyPage()}
          </div>
          {pageType === "mypage" && (
            <Link href="/" className={cx("go-to-home-btn")}>
              질문목록 보러가기
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export { MyPageQuestionList };
