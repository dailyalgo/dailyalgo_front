interface Notification {
  id: number;
  is_read: number;
  user_id: number;
  type: string;
  subject: string;
  subject_id: number;
  subject_name: string;
  object: string;
  object_name: string;
  target_url?: string;
  content?: string;
  created_time: Date;
}

interface NotificationListReq {
  unreadOnly?: boolean;
  offset?: number;
}

interface NotificationList {
  total_cnt: number;
  nextIndex: number;
  notification_list: Notification[];
}

export type { Notification, NotificationListReq, NotificationList };
