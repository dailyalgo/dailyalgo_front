import classNames from "classnames/bind";
import { useState } from "react";
import { SvgIcon } from "@components/icon/SvgIcon";
import { IconButton } from "@components/button/IconButton";
import style from "./AnswerTagItemWithInput.module.scss";

const cx = classNames.bind(style);

interface Props {
  handleTagAdd: (tag: string) => void;
}

const AnswerTagItemWithInput = ({ handleTagAdd }: Props) => {
  const [inputOpend, setInputOpend] = useState(false);
  const [value, setValue] = useState("");

  const handleTagClick = () => {
    if (!inputOpend) {
      setInputOpend(true);
    }
  };

  const handleCloseClick = () => {
    handleTagAdd(value);
    setInputOpend(false);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTagAdd(value);
      setInputOpend(false);
      setValue("");
    }
  };

  return (
    <div className={cx("tag-item", inputOpend && "tag-item-with-input")} onClick={handleTagClick}>
      {inputOpend ? (
        <>
          <input
            type="text"
            className={cx("tag-input")}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <IconButton
            title="태그 추가 취소"
            onClick={handleCloseClick}
            icon={<SvgIcon iconName="close" size={18} />}
          />
        </>
      ) : (
        <SvgIcon iconName="plus" size={18} />
      )}
    </div>
  );
};

export { AnswerTagItemWithInput };
