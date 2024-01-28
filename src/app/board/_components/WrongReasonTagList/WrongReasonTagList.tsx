import { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import { SvgIcon } from "@components/icon/SvgIcon";
import { IconButton } from "@components/button/IconButton";
import style from "./WrongReasonTagList.module.scss";

const cx = classNames.bind(style);

const WrongReasonTagList = () => {
  const [wrongReasonTagList, setWrongReasonTagList] = useState<string[]>([
    "오타",
    "범위 확인",
    "로직 변경",
  ]);
  const [wrongReasonTag, setWrongReasonTag] = useState<string>("");
  const [plusActive, setPlusActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPlusActive(false);
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <ul className={cx("wrong-reason-tag-list-wrap")}>
      {wrongReasonTagList.map((tag, index) => {
        if (index < 3) {
          return (
            <li
              key={tag}
              className={cx("wrong-reason-tag-item", { active: tag === wrongReasonTag })}
            >
              <button
                type="button"
                onClick={() => {
                  if (tag === wrongReasonTag) {
                    setWrongReasonTag("");
                    return;
                  }
                  setWrongReasonTag(tag);
                }}
              >
                {tag}
              </button>
            </li>
          );
        }
        return (
          <li key={tag} className={cx("wrong-reason-tag-item", "active", "added")}>
            <span>
              {tag}
              <IconButton
                icon={<SvgIcon iconName="close" size={20} className={cx("close-icon")} />}
                title="삭제"
                onClick={() => {
                  setWrongReasonTagList(wrongReasonTagList.filter((item) => item !== tag));
                }}
                className={cx("close-button")}
              />
            </span>
          </li>
        );
      })}
      {wrongReasonTagList.length < 4 && (
        <li className={cx("plus-item", { active: plusActive })}>
          {!plusActive ? (
            <button
              type="button"
              onClick={() => {
                setPlusActive(true);
              }}
              className={cx("active-button")}
            >
              +
            </button>
          ) : (
            <>
              <input
                type="text"
                placeholder="글자입력 후 엔터"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (e.currentTarget.value === "") return;
                    if (wrongReasonTagList.includes(e.currentTarget.value)) return;
                    setWrongReasonTagList([...wrongReasonTagList, e.currentTarget.value]);
                    setPlusActive(false);
                  }
                }}
                ref={inputRef}
              />
              <IconButton
                icon={<SvgIcon iconName="plus" size={20} className={cx("plus-icon")} />}
                title="추가"
                onClick={() => {
                  if (inputRef.current && inputRef.current.value === "") return;
                  if (inputRef.current && wrongReasonTagList.includes(inputRef.current.value))
                    return;
                  setWrongReasonTagList([...wrongReasonTagList, wrongReasonTag]);
                  setPlusActive(false);
                }}
                className={cx("plus-button")}
              />
            </>
          )}
        </li>
      )}
    </ul>
  );
};

export { WrongReasonTagList };
