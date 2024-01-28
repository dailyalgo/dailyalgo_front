"use client";

import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { CommonDropdown } from "@components/dropdown/CommonDropdown";
import { SvgIcon } from "@components/icon/SvgIcon";
import { Footer } from "@components/organisms/Footer";
import { Pagination } from "@components/common/Pagination/Pagination";
import { fetchQuestionList, requestScrapQuestion } from "src/api/Question";
import { reduxAppSelector } from "src/redux/store";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import type { QuestionDetail } from "src/types/question";
import { FilterModal } from "../FilterModal";
import { HeroBanner } from "../HeroBanner";
import { QuestionListItem } from "../QuestionListItem";
import style from "./HomeLayout.module.scss";

const cx = classNames.bind(style);

const HomeLayout = () => {
  const searchParams = useSearchParams();
  const { isLogIn } = reduxAppSelector((state) => state.authReducer.value);

  const sortOptions = [
    { id: "new", label: "최신순" },
    // { id: "like", label: "좋아요순" },
    // { id: "comment", label: "댓글순" },
  ];
  const sourceOptions = [
    { id: "all", label: "전체" },
    { id: "boj", label: "백준" },
    { id: "programmers", label: "프로그래머스" },
    { id: "swea", label: "SWEA" },
    {
      id: "leetCode",
      label: "LeetCode",
    },
  ];
  const questionTypeOptions = [
    { id: "all", label: "전체" },
    {
      id: "timeOut",
      label: "시간초과",
    },
    {
      id: "memoryExceed",
      label: "메모리 초과",
    },
    {
      id: "error",
      label: "에러",
    },
    {
      id: "solution",
      label: "해결방법",
    },
    {
      id: "counterExample",
      label: "반례요청",
    },
    {
      id: "whyWrong",
      label: "왜맞틀",
    },
    {
      id: "whyRight",
      label: "왜틀맞",
    },
    {
      id: "etc",
      label: "기타",
    },
  ];
  const questionStatusOptions = [
    { id: "all", label: "전체" },
    { id: "answered", label: "답변완료" },
    { id: "not_answered", label: "미완료" },
  ];

  const [sort, setSort] = useState(sortOptions[0].id);
  const [source, setSource] = useState(sourceOptions[0].id);
  const [questionType, setQuestionType] = useState(questionTypeOptions[0].id);
  const [questionStatus, setQuestionStatus] = useState(questionStatusOptions[0].id);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [filterTag, setFilterTag] = useState<string>("");

  const [questionList, setQuestionList] = useState<QuestionDetail[]>([]);
  const [totalPage, setTotalPage] = useState(0);

  const clickScrapHandler = async (idx: number, id: number) => {
    if (!isLogIn) {
      toast.warning("로그인이 필요한 서비스입니다.");
      return;
    }

    try {
      await requestScrapQuestion(id);
      const newQuestionList = [...questionList];
      newQuestionList[idx].is_scrap = Math.abs(newQuestionList[idx].is_scrap - 1);
      setQuestionList(newQuestionList);
    } catch (e) {
      toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  useEffect(() => {
    const keyword = searchParams.get("keyword");

    const offset = (page - 1) * 10;

    let tagKeyword = "";
    if (filterTag === "전체") {
      tagKeyword = "";
    } else {
      tagKeyword = filterTag;
    }

    const requestBody = {
      offset,
      keyword,
      source,
      type: questionType,
      status: questionStatus,
      order: sort,
      tag: tagKeyword,
    };

    const getQuestionList = async () => {
      try {
        const res = await fetchQuestionList(requestBody);
        setTotalPage(res.total_cnt);
        setQuestionList(res.question_list);
      } catch (e) {
        toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
      }
    };

    getQuestionList();
  }, [searchParams, sort, source, questionType, questionStatus, page, filterTag]);

  useEffect(() => {
    setPage(1);
  }, [searchParams, sort, source, questionType, questionStatus]);

  return (
    <div className={cx("home-layout-wrap")}>
      <HeroBanner />
      <div className={cx("home-layout-inner")}>
        <div className={cx("list-wrap")}>
          <strong className={cx("list-title")}>전체</strong>
          <div className={cx("sub-title-wrap")}>
            <span className={cx("sub-title")}>{totalPage}개의 알고</span>
            <div className={cx("filter-wrap")}>
              <CommonDropdown
                options={sortOptions}
                initialValue={sortOptions[0].id}
                changeHandler={setSort}
              />
              <CommonDropdown
                options={sourceOptions}
                placeholder="문제 출처"
                changeHandler={setSource}
                className={cx("source-dropdown")}
              />
              <CommonDropdown
                options={questionTypeOptions}
                placeholder="질문 타입"
                changeHandler={setQuestionType}
              />
              <CommonDropdown
                options={questionStatusOptions}
                placeholder="질문 상태"
                changeHandler={setQuestionStatus}
              />
              <div className={cx("filter-btn")} onClick={() => setIsFilterModalOpen(true)}>
                {filterTag === "" ? (
                  <div className={cx("filter-btn-inner")}>
                    <SvgIcon size={18} iconName="filter" />
                    필터
                  </div>
                ) : (
                  <span>{filterTag}</span>
                )}
              </div>
            </div>
          </div>
          <ul className={cx("question-list")}>
            {questionList.map((item, idx) => (
              <QuestionListItem
                key={`question-${item.id}`}
                question={item}
                idx={idx}
                onClickScrap={clickScrapHandler}
              />
            ))}
          </ul>
          {questionList.length > 0 ? (
            <Pagination totalCnt={totalPage} page={page} setPage={setPage} />
          ) : (
            <div className={cx("none-answer")}>
              <span>검색 결과가 없습니다.</span>
            </div>
          )}
        </div>
        <div className={cx("advertise-wrap")}>
          <div className={cx("temp-ad")}>광고 영역</div>
        </div>
      </div>
      <FilterModal
        isOpen={isFilterModalOpen}
        closeModal={() => setIsFilterModalOpen(false)}
        filterTag={filterTag}
        setFilterTag={setFilterTag}
      />
      <Footer />
    </div>
  );
};

export { HomeLayout };
