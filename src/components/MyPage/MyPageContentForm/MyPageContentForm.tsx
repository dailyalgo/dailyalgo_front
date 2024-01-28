import { reduxAppSelector } from "src/redux/store";
import { SideTab } from "../SideTab";
import { MyPageQuestionList } from "./MyPageQuestionList";
import { NotificationList } from "./NotificationList";

interface Props {
  showNotification: boolean;
}

const MyPageContentForm = ({ showNotification }: Props) => {
  const mypageTabList = [
    {
      label: "답변",
      id: "answer",
    },
    {
      label: "질문",
      id: "question",
    },
    {
      label: "다시보기",
      id: "scrap",
    },
    {
      label: "알람",
      id: "notification",
    },
  ];

  const { userInfo } = reduxAppSelector((state) => state.authReducer.value);

  const mypageTabContents = mypageTabList.map((tab) => {
    if (tab.id === "notification") {
      return <NotificationList key={tab.id} />;
    }
    return <MyPageQuestionList key={tab.id} tab={tab} userId={userInfo.id} pageType="mypage" />;
  });

  return (
    <SideTab
      tabList={mypageTabList.map((tab) => tab.label)}
      tabContents={mypageTabContents}
      defaultActiveTabIdx={showNotification ? 3 : 0}
    />
  );
};

export { MyPageContentForm };
