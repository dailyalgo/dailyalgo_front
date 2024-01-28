// import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { IconButton } from "@components/button/IconButton";
import { SvgIcon } from "@components/icon/SvgIcon";
import Link from "next/link";
import { PlatformTag } from "@components/icon/PlatformTag";
import { ProblemTag } from "@components/icon/ProblemTag";
import { Tag } from "@components/icon/Tag";
import { UserProfileThumbnail } from "@components/user/UserProfileThumbnail";
import { TimeAgo } from "@components/user/TimeAgo";
import { ProblemType } from "src/types/tag";
import type { QuestionDetail } from "src/types/question";
import style from "./QuestionListItem.module.scss";

const cx = classNames.bind(style);

interface Props {
  question: QuestionDetail;
  idx: number;
  onClickScrap: (idx: number, id: number) => void;
}

const QuestionListItem = ({ question, idx, onClickScrap }: Props) => {
  const countInfoArray = [
    {
      iconName: "eye",
      count: question.view_cnt,
    },
    {
      iconName: "like-off",
      count: question.like_cnt,
    },
    {
      iconName: "chat",
      count: question.comment_cnt,
    },
  ];

  return (
    <li className={cx("question-list-item-wrap")}>
      <IconButton
        icon={<SvgIcon iconName={question.is_scrap ? "solid-tag-on" : "solid-tag-off"} size={32} />}
        title="북마크"
        onClick={() => onClickScrap(idx, question.id)}
      />
      <div className={cx("question-contents-wrap")}>
        <div className={cx("item-header")}>
          <div className={cx("header-left")}>
            <PlatformTag platform={question.source} />
            <ProblemTag tagName={question.type as ProblemType} size="sm" />
          </div>
          <div className={cx("header-right")}>
            {question.tags.map((algorithmTag) => (
              <Tag key={algorithmTag.name} label={algorithmTag.name} />
            ))}
          </div>
        </div>
        {/* TODO: 문제 id 로 링크 */}
        {/* TODO: props 이름 api랑 맞추기 */}
        <Link href={`/board/detail/${question.id}`}>
          <strong className={cx("question-title")}>{question.title}</strong>
          <span className={cx("question-contents")}>{question.content}</span>
        </Link>
        <div className={cx("item-bottom")}>
          <div className={cx("count-info-wrap")}>
            {countInfoArray.map((countInfo) => (
              <div key={countInfo.iconName} className={cx("count-item-wrap")}>
                <SvgIcon iconName={countInfo.iconName as any} size={20} />
                <span className={cx("count")}>{countInfo.count}</span>
              </div>
            ))}
          </div>
          <Link href={`/user/${question.user_id}`} className={cx("user-info-wrap")}>
            <UserProfileThumbnail userName={question.user_nickname} />
            <TimeAgo time={question.created_time} />
          </Link>
        </div>
      </div>
    </li>
  );
};

export { QuestionListItem };
