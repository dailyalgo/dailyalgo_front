import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { IconButton } from "@components/button/IconButton";
import { SvgIcon } from "@components/icon/SvgIcon";
import { fetchNotificationCount } from "src/api/Notification";
import { usePathname } from "next/navigation";
import { NotificationList } from "./NotificationList";

import style from "./NotificationButton.module.scss";

const cx = classNames.bind(style);

const NotificationButton = () => {
  const pathname = usePathname();

  const [notificationCnt, setNotificationCnt] = useState<number>(0);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);

  const closeNotification = () => {
    setIsNotificationOpen(false);
  };

  const getNotificationCount = async () => {
    try {
      const res = await fetchNotificationCount();
      setNotificationCnt(res);
    } catch (e) {
      setNotificationCnt(0);
    }
  };

  const clearNotificationCnt = () => {
    setNotificationCnt(0);
  };

  const clickAlarmBtn = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  useEffect(() => {
    getNotificationCount();
  }, []);

  useEffect(() => {
    closeNotification();
    getNotificationCount();
  }, [pathname]);

  return (
    <div className={cx("notification-btn-wrap")}>
      <IconButton
        icon={<SvgIcon iconName="alert" size={36} />}
        title="alert"
        onClick={clickAlarmBtn}
        className="notification-btn"
      />
      {notificationCnt > 0 && <div className={cx("notification-badge")} />}
      {isNotificationOpen && (
        <NotificationList
          closeNotification={closeNotification}
          clearNotificationCnt={clearNotificationCnt}
        />
      )}
    </div>
  );
};

export { NotificationButton };
