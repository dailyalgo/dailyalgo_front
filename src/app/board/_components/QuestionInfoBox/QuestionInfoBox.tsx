import {
  useState,
  // Dispatch,
  // SetStateAction,
  ComponentProps,
  useEffect,
  useRef,
} from "react";
import classNames from "classnames/bind";
import { Controller } from "react-hook-form";
import { BasicInput } from "@components/input/BasicInput";
import { CommonDropdown } from "@components/dropdown/CommonDropdown";
import { Tag } from "@components/icon/Tag";
import { SvgIcon } from "@components/icon/SvgIcon";
import { QuestionTagModal } from "./QustionTagModal";
import { InputBlock } from "./InputBlock";
import style from "./QuestionInfoBox.module.scss";

const cx = classNames.bind(style);

type OptionType = Pick<ComponentProps<typeof CommonDropdown>, "options">;

// interface Props {
// setSource: Dispatch<SetStateAction<string>>;
// setLink: Dispatch<SetStateAction<string>>;
// setType: Dispatch<SetStateAction<string>>;
// setTag: Dispatch<SetStateAction<string[]>>;
// }

const sourceOptionList: OptionType["options"] = [
  {
    id: "boj",
    label: "백준",
  },
  {
    id: "programmers",
    label: "프로그래머스",
  },
  {
    id: "swea",
    label: "SWEA",
  },
  {
    id: "leetCode",
    label: "LeetCode",
  },
];

const typeOptionList: OptionType["options"] = [
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

interface Props {
  register: any;
  control: any;
  tagList: string[];
  handleTagAdd: (tag: string) => void;
  setTagList: any;
  defaultSource?: string;
  defaultType?: string;
}

interface RefMethods {
  setInitialValue: (val: string) => void;
}

const QuestionInfoBox = ({
  register,
  control,
  tagList,
  handleTagAdd,
  setTagList,
  defaultSource,
  defaultType,
}: Props) => {
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const sourceRef = useRef<RefMethods | null>(null);
  const typeRef = useRef<RefMethods | null>(null);

  const handleTagModalOpen = () => {
    setIsTagModalOpen(!isTagModalOpen);
  };

  useEffect(() => {
    if (defaultSource) {
      sourceRef.current?.setInitialValue(defaultSource);
    }
    if (defaultType) {
      typeRef.current?.setInitialValue(defaultType);
    }
  }, [defaultSource, defaultType]);

  return (
    <div className={cx("question-info-box-wrap")}>
      <strong className={cx("box-title")}>문제 정보</strong>
      <InputBlock label="출처">
        <Controller
          name="source"
          control={control}
          render={({ field }) => (
            <CommonDropdown
              ref={sourceRef}
              options={sourceOptionList}
              placeholder="문제 출처"
              size="full"
              changeHandler={field.onChange}
            />
          )}
        />
      </InputBlock>
      <InputBlock label="문제 링크">
        <BasicInput id="link" size="sm" {...register("link")} />
      </InputBlock>
      <InputBlock label="질문 유형">
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <CommonDropdown
              ref={typeRef}
              options={typeOptionList}
              placeholder="질문 타입을 선택해주세요."
              size="full"
              changeHandler={field.onChange}
            />
          )}
        />
      </InputBlock>
      <div className={cx("add-tag-wrap")}>
        <h1>태그</h1>
        <span>관련 태그를 추가해주세요 (최대 5개)</span>
        <button className={cx("add-tag-button")} type="button" onClick={handleTagModalOpen}>
          태그 추가
        </button>
      </div>
      {tagList.length > 0 && (
        <div className={cx("tag-list")}>
          {tagList.map((tag) => (
            // TODO: 태그 삭제 기능 추가
            <div className={cx("tag-wrap")} key={tag}>
              <Tag label={tag} />
              <button
                type="button"
                className={cx("tag-delete-btn")}
                onClick={() => {
                  setTagList(tagList.filter((item) => item !== tag));
                }}
              >
                <SvgIcon iconName="close" size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
      <QuestionTagModal
        isOpen={isTagModalOpen}
        closeModal={handleTagModalOpen}
        handleTagAdd={handleTagAdd}
        tagList={tagList}
      />
    </div>
  );
};

export { QuestionInfoBox };
