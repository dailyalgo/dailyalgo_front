"use client";

import { useState } from "react";
import classNames from "classnames/bind";
import style from "./SideTab.module.scss";

const cx = classNames.bind(style);

interface Props {
  tabList: string[];
  tabContents: React.ReactNode[];
  defaultActiveTabIdx?: number;
}

const SideTab = ({ tabList, tabContents, defaultActiveTabIdx = 0 }: Props) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTabIdx);

  return (
    <div className={cx("side-tab-wrap")}>
      <div className={cx("tab-list")}>
        {tabList.map((tab, index) => (
          <button
            type="button"
            className={cx("tab-item", activeTab === index && "active")}
            onClick={() => setActiveTab(index)}
            key={tab}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={cx("tab-contents-wrap")}>{tabContents[activeTab]}</div>
    </div>
  );
};

export { SideTab };
