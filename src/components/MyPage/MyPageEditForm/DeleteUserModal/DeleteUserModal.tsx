import classNames from "classnames/bind";
import { BasicModal } from "@components/modal/BasicModal";
import { BasicButton } from "@components/button/BasicButton";
import { useState } from "react";
import style from "./DeleteUserModal.module.scss";

const cx = classNames.bind(style);

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

const DeleteUserModal = ({ isOpen, closeModal }: Props) => {
  const [isConfirm, setIsConfirm] = useState(false);

  const close = () => {
    setIsConfirm(false);
    closeModal();
  };

  return (
    <BasicModal isOpen={isOpen} closeModal={close}>
      <div className={cx("delete-user-modal-wrap")}>
        <span className={cx("modal-header")}>회원 탈퇴하기</span>
        {!isConfirm ? (
          <>
            <span>정말로 탈퇴하시겠습니까?</span>
            <div className={cx("modal-footer")}>
              <BasicButton buttonType="secondary" onClick={() => setIsConfirm(true)}>
                탈퇴하기
              </BasicButton>
              <BasicButton onClick={close}>취소</BasicButton>
            </div>
          </>
        ) : (
          <form>
            <span>비밀번호를 입력해주세요.</span>
            <div className={cx("modal-footer")}>
              <BasicButton buttonType="secondary" onClick={() => setIsConfirm(true)}>
                탈퇴하기
              </BasicButton>
              <BasicButton onClick={close}>취소</BasicButton>
            </div>
          </form>
        )}
      </div>
    </BasicModal>
  );
};

export { DeleteUserModal };
