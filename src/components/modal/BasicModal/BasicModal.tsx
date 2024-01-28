import classNames from "classnames/bind";
import { SvgIcon } from "@components/icon/SvgIcon";
import ReactDOM from "react-dom";
import style from "./BasicModal.module.scss";

const cx = classNames.bind(style);

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};

const BasicModal = ({ isOpen, closeModal, children }: Props) => {
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return ReactDOM.createPortal(
    <div className={cx("modal-overlay")} onClick={handleOverlayClick}>
      <div className={cx("modal-container")}>
        <div className={cx("modal-top")}>
          <div onClick={closeModal} className={cx("modal-close-btn")}>
            <SvgIcon iconName="close" size={32} />
          </div>
        </div>
        <div className={cx("modal-content")}>{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export { BasicModal };
