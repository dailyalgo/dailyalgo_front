import classNames from "classnames/bind";
import { useEffect, useState, useMemo } from "react";
import { AnswerTagItem } from "./AnswerTagItem";
import { AnswerTagItemWithInput } from "./AnswerTagItemWithInput";
import style from "./AnswerTagInputForm.module.scss";

const cx = classNames.bind(style);

interface Props {
  tagList: string[];
  handleTagAdd: (tag: string) => void;
}

const AnswerTagInputForm = ({ tagList, handleTagAdd }: Props) => {
  const reasonList = useMemo(() => ["오타", "로직오류", "제한범위확인", "반례오류"], []);
  const [addedTag, setAddedTag] = useState<string[]>([]);

  useEffect(() => {
    const newAddedTag = tagList.filter((item) => !reasonList.includes(item));
    setAddedTag(newAddedTag);
  }, [tagList, reasonList]);

  return (
    <div className={cx("answer-tag-input-form")}>
      <p>
        오답 원인<span>(최대 5개)</span>
      </p>
      <div className={cx("tag-wrap")}>
        {reasonList.map((item) => (
          <AnswerTagItem
            key={`tag-${item}`}
            label={item}
            onClick={handleTagAdd}
            isActive={tagList.includes(item)}
          />
        ))}
        {addedTag.map((item) => (
          <AnswerTagItem
            key={`tag-${item}`}
            label={item}
            onClick={handleTagAdd}
            isActive={tagList.includes(item)}
          />
        ))}
        {tagList.length < 5 && <AnswerTagItemWithInput handleTagAdd={handleTagAdd} />}
      </div>
    </div>
  );
};

export { AnswerTagInputForm };
