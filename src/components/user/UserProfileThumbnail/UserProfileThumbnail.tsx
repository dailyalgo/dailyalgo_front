import classNames from "classnames/bind";
import { ProfileBadge } from "../ProfileBadge";
import style from "./UserProfileThumbnail.module.scss";

const cx = classNames.bind(style);

interface Props {
  userName: string;
  userProfileImage?: string;
  imageShow?: boolean;
  imageSize?: number;
}

const UserProfileThumbnail = ({
  userName,
  userProfileImage,
  imageShow = true,
  imageSize = 24,
}: Props) => {
  // TODO: userPageUrl 만들기

  return (
    <div className={cx("user-profile-thumbnail-wrap")}>
      {imageShow && <ProfileBadge profileImage={userProfileImage} size={imageSize} />}
      {/* TODO: n 분전 작성 컴포넌트 삽입 */}
      <div className={cx("user-name")}>{userName}</div>
    </div>
  );
};

export { UserProfileThumbnail };
