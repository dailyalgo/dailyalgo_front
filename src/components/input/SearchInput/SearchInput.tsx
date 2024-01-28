import classNames from "classnames/bind";
import { SvgIcon } from "@components/icon/SvgIcon";
import { KeyboardEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BasicInput } from "../BasicInput";
import style from "./SearchInput.module.scss";

const cx = classNames.bind(style);

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    const searchValue = event.currentTarget.value;
    if (searchValue) {
      router.push(`/?keyword=${searchValue}`);
    }
  };
  return (
    <div className={cx("search-input-wrap")}>
      <SvgIcon iconName="search" size={24} />
      <BasicInput
        id="search_input"
        type="text"
        placeholder="태그 혹은 문제이름을 검색해 보세요."
        defaultValue={searchParams.get("keyword") ?? ""}
        onEnter={handleSearch}
      />
    </div>
  );
};

export { SearchInput };
