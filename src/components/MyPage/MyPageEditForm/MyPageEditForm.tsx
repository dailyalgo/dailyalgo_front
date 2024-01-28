import { SideTab } from "../SideTab";
import { ChangePwForm } from "./ChangePwForm";
import { ChangeProfileForm } from "./ChangeProfileForm";
import { ChangeOrganizationForm } from "./ChangeOrganizationForm";

const MyPageEditForm = () => {
  const mypageEditTabList = ["프로필 수정", "비밀번호 변경", "소속 변경"];
  const mypageEditTabContents = [
    <ChangeProfileForm />,
    <ChangePwForm />,
    <ChangeOrganizationForm />,
  ];

  return <SideTab tabList={mypageEditTabList} tabContents={mypageEditTabContents} />;
};

export { MyPageEditForm };
