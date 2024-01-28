"use client";

import classNames from "classnames/bind";
import Link from "next/link";
import Image from "next/image";
import { reduxAppSelector } from "src/redux/store";
// import { IconButton } from "@components/button/IconButton";
// import { SvgIcon } from "@components/icon/SvgIcon";
import style from "./HeroBanner.module.scss";

const cx = classNames.bind(style);

// TODO: 배너 닫기 기능 추가
// TODO: 로그인 시 배너 안나오게
// interface Props {}

const HeroBanner = () => {
  const { isLogIn } = reduxAppSelector((state) => state.authReducer.value);

  const signUpUrl = "/";
  return (
    <div className={cx("hero-banner-wrap")}>
      <div className={cx("text-wrap")}>
        <strong className={cx("banner-title")}>Welcome!</strong>
        <div>
          DailyAlgo(데일리알고)는 커뮤니티 기반의 알고리즘 역량 강화 플랫폼입니다. 데일리알고에서는
          다양한 동료들과 함께 정보를 나누고 동반성장 할 수 있습니다 :)
        </div>
        {!isLogIn && (
          <div>
            간단한 <Link href={signUpUrl}>회원 가입</Link> 후 첫 게시글을 작성해 보세요!
          </div>
        )}
      </div>
      <div className={cx("image-wrap")}>
        <Image src="/assets/image/img_home_hero_banner.png" fill alt="" />
      </div>
      {/* <IconButton
        icon={<SvgIcon iconName="close" size={24} />}
        title="배너 닫기"
        className={cx("close-btn")}
      /> */}
    </div>
  );
};

export { HeroBanner };
