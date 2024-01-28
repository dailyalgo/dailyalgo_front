import { BasicModal } from "@components/modal/BasicModal";
import { BasicButton } from "@components/button/BasicButton";
import classNames from "classnames/bind";
import { AlAgreementModalContent } from "./ModalContent/AlAgreementModalContent";
import { IdAgreementModalContent } from "./ModalContent/IdAgreementModalContent";
import style from "./AgreementModal.module.scss";

type Props = {
  type: "al" | "id";
  isOpen: boolean;
  closeModal: () => void;
  agreementClick: (type: "al" | "id") => void;
};

const cx = classNames.bind(style);

const AgreementModal = ({ type, isOpen, closeModal, agreementClick }: Props) => {
  return (
    <BasicModal isOpen={isOpen} closeModal={closeModal}>
      {type === "al" ? <AlAgreementModalContent /> : <IdAgreementModalContent />}

      <div className={cx("footer")}>
        <BasicButton onClick={() => agreementClick(type)}>동의</BasicButton>
        <BasicButton buttonType="third" onClick={closeModal}>
          취소
        </BasicButton>
      </div>
    </BasicModal>
  );
};

export { AgreementModal };
