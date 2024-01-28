import classNames from "classnames/bind";
import Image from "next/image";
import { CSSProperties } from "react";
import style from "./ProfileBadge.module.scss";

const cx = classNames.bind(style);

interface Props {
  profileImage?: string;
  size: number;
}

const ProfileBadge = ({ profileImage, size }: Props) => {
  const imgUrl = profileImage ?? "/assets/image/logo_colored.png";
  return (
    <span
      className={cx("profile-image-wrap")}
      style={
        {
          "--size": `${size}px`,
        } as CSSProperties
      }
    >
      <Image src={imgUrl} fill sizes="100%" alt="profile image" priority />
    </span>
  );
};

export { ProfileBadge };
