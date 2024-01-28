// import { useState, useEffect } from 'react';
import classNames from "classnames/bind";
import style from "./Footer.module.scss";

const cx = classNames.bind(style);

// interface Props {

// }

const Footer = () => {
  return (
    <div className={cx("footer-wrap")}>
      <div className={cx("contents-wrap")}>
        <div className={cx("info-wrap")}>
          <div className={cx("info-top")}>
            <span>사업자등록번호 : 806-81-03044</span>
            <span>주소 : 서울시 노원구 동일로 174길 27, 서울창업디딤터 1층 STATION:D</span>
            <span>대표자명 : 권이혁</span>
            <span>이메일 : contact@nodecrew.kr</span>
          </div>
          <div className={cx("info-bottom")}>
            <span>법인명(국문) : 주식회사 노드크루</span>
            <span>법인명(영문) : NODECREW Co.,ltd</span>
          </div>
        </div>
        <img className={cx("logo-img")} src="/images/brandLogo.png" alt="default" />
      </div>
      {/* <div className={cx("copyright")}>
        <span>Copyright NODECREW. All rights reserved.</span>
      </div> */}
    </div>
  );
};

export { Footer };
