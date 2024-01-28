import { createHttpCilent } from "src/lib/http-client";

import type { NotificationList, NotificationListReq } from "src/types/notification";
import type { QuestionDetail } from "src/types/question";
import type { UserInfo } from "src/types/user";
import {
  API_NOTIFICATION,
  API_NOTIFICATION_ITEM,
  API_NOTIFICATION_COUNT,
  API_NOTIFICATION_READ_ALL,
} from "../contants";

const instance = createHttpCilent()
  .setBaseUrl(process.env.NEXT_PUBLIC_API_URL ?? "")
  .build();

export const fetchNotificationList = (
  requestBody: NotificationListReq
): Promise<NotificationList> => {
  return instance.get(API_NOTIFICATION, { params: requestBody });
};

export const fetchNotificationItem = (id: number): Promise<QuestionDetail | UserInfo> => {
  return instance.get(API_NOTIFICATION_ITEM(id));
};

export const fetchNotificationCount = (): Promise<number> => {
  return instance.get(API_NOTIFICATION_COUNT);
};

export const requestReadAllNotification = (): Promise<boolean> => {
  return instance.put(API_NOTIFICATION_READ_ALL);
};
