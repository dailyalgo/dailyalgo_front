import classNames from "classnames/bind";
import { fetchNotificationList, requestReadAllNotification } from "src/api/Notification";
import { useState, useEffect } from "react";
import type { Notification } from "src/types/notification";
import { toast } from "react-toastify";
import { Pagination } from "@components/common/Pagination/Pagination";
import { NotificationListItem } from "../NotificationListItem";
import style from "./NotificationList.module.scss";

const cx = classNames.bind(style);

const NotificationList = () => {
  const [notificationList, setNotificationList] = useState<Notification[]>([]);
  const [totalCnt, setTotalCnt] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const getNotificationList = async () => {
    const offset = (page - 1) * 10;

    const requestBody = {
      unreadOnly: false,
      offset,
    };

    try {
      const res = await fetchNotificationList(requestBody);
      setTotalCnt(res.total_cnt);
      setNotificationList(res.notification_list);
    } catch (e) {
      toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
  };

  const clickReadAllBtn = async () => {
    try {
      await requestReadAllNotification();
      getNotificationList();
    } catch (e) {
      toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    const getNotificationListFirstRender = async () => {
      const offset = (page - 1) * 10;

      const requestBody = {
        unreadOnly: false,
        offset,
      };

      try {
        const res = await fetchNotificationList(requestBody);
        setTotalCnt(res.total_cnt);
        setNotificationList(res.notification_list);
      } catch (e) {
        toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해주세요.");
      }
    };

    getNotificationListFirstRender();
  }, [page]);

  return (
    <div className={cx("notification-wrap")}>
      <div className={cx("notification-header")}>
        <span className={cx("notification-header-text")}>알림</span>
        <span className={cx("notification-all-read-btn")} onClick={clickReadAllBtn}>
          모두 읽음
        </span>
      </div>
      <div className={cx("notification-list")}>
        {notificationList.map((notification) => (
          <NotificationListItem key={notification.id} notification={notification} />
        ))}
      </div>
      <Pagination totalCnt={totalCnt} page={page} setPage={setPage} />
    </div>
  );
};

export { NotificationList };
