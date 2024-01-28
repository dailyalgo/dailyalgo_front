import { useState } from "react";
import { debounce } from "lodash";
import { BasicModal } from "@components/modal/BasicModal";
import { BasicInput } from "@components/input/BasicInput";
import classNames from "classnames/bind";
import style from "./FilterModal.module.scss";

const cx = classNames.bind(style);

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  filterTag: string;
  setFilterTag: (item: string) => void;
};

const filerItemList: string[] = [
  "전체",
  "완전탐색",
  "자료구조",
  "해쉬",
  "리스트",
  "스택",
  "큐",
  "우선순위큐 (힙)",
  "트리",
  "그래프",
  "DFS",
  "BFS",
  "DP",
  "메모이제이션",
  "정수론",
  "기하학",
  "수학",
  "문자열",
  "그리디",
  "이분탐색",
  "정렬",
  "비트마스킹",
  "시뮬레이션",
  "백트래킹",
  "순열",
  "조합",
  "부분집합",
  "재귀함수",
  "분할정복",
  "투 포인터",
  "기타",
];

const FilterItem = ({
  item,
  isSelected,
  onClick,
}: {
  item: string;
  isSelected: boolean;
  onClick: (item: string) => void;
}) => {
  return (
    <div
      className={isSelected ? cx("filter-selected-item") : cx("filter-item")}
      onClick={() => onClick(item)}
    >
      <span>{item}</span>
    </div>
  );
};

const FilterModal = ({ isOpen, closeModal, filterTag, setFilterTag }: Props) => {
  const [visibleFilterItem, setVisibleFilterItem] = useState<string[]>(filerItemList);

  const searchKeywordHanlder = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    if (!keyword) {
      setVisibleFilterItem(filerItemList);
      return;
    }
    const filteredItem = filerItemList.filter((item) => item.includes(keyword));
    setVisibleFilterItem(filteredItem);
  }, 300);

  return (
    <BasicModal isOpen={isOpen} closeModal={closeModal}>
      <div className={cx("filter-modal")}>
        <div className={cx("filter-input")}>
          <BasicInput
            id="search-keyword"
            placeholder="알고리즘 이름을 입력해 주세요."
            onChange={searchKeywordHanlder}
          />
        </div>
        <div className={cx("filter-item-wrap")}>
          {visibleFilterItem.length === 0 ? (
            <span className={cx("result-none-text")}>검색된 결과가 없습니다.</span>
          ) : (
            <>
              {visibleFilterItem.map((item) => (
                <FilterItem
                  key={item}
                  item={item}
                  isSelected={filterTag === item}
                  onClick={setFilterTag}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </BasicModal>
  );
};

export { FilterModal };
