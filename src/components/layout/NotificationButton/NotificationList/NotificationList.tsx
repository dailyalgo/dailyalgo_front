import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { fetchNotificationList, requestReadAllNotification } from "src/api/Notification";
import type { Notification } from "src/types/notification";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { NotificationListItem } from "./NotificationListItem";
import style from "./NotificationList.module.scss";

const cx = classNames.bind(style);

interface Props {
  closeNotification: () => void;
  clearNotificationCnt: () => void;
}

const NotificationList = ({ closeNotification, clearNotificationCnt }: Props) => {
  const router = useRouter();

  const [notificationList, setNotificationList] = useState<Notification[]>([]);
  const [notificationCnt, setNotificationCnt] = useState<number>(0);

  const clickReadAllBtn = async () => {
    try {
      await requestReadAllNotification();
      setNotificationCnt(0);
      setNotificationList([]);
      clearNotificationCnt();
    } catch (e) {
      toast.error("예기치 못한 오류가 발생했습니다.");
    }
  };

  const clickAllNotificationViewBtn = () => {
    router.push("/mypage?show-notification=true");
  };

  useEffect(() => {
    const getNotificationList = async () => {
      const requestBody = {
        unreadOnly: false,
      };

      try {
        const res = await fetchNotificationList(requestBody);
        setNotificationList(res.notification_list.splice(0, 5));
        setNotificationCnt(res.total_cnt);
      } catch (e) {
        toast.error("예기치 못한 오류가 발생했습니다.");
      }
    };
    getNotificationList();
  }, []);

  return (
    <div className={cx("notification-popup")}>
      {notificationList.length > 0 ? (
        <div className={cx("notification-list-wrap")}>
          <div className={cx("notification-list-top")}>
            <div onClick={clickReadAllBtn}>모두 읽음</div>
          </div>
          <div className={cx("notification-list")}>
            {notificationList.map((notification) => (
              <NotificationListItem
                notification={notification}
                key={`notification-${notification.id}`}
                closeNotification={closeNotification}
              />
            ))}
          </div>
          {notificationCnt > 5 && (
            <div className={cx("notification-list-bottom")}>
              <div onClick={clickAllNotificationViewBtn}>알림 전체보기</div>
            </div>
          )}
        </div>
      ) : (
        <div className={cx("none-result-wrap")}>
          <img className={cx("logo-img")} src="/images/brandLogo.png" alt="default" />
          <div className={cx("text-top")}>아직 알림이 없습니다.</div>
          <div className={cx("text-bottom")}>게시글을 작성하고 다양한 피드백을 받아보세요!</div>
        </div>
      )}
    </div>
  );
};

export { NotificationList };
