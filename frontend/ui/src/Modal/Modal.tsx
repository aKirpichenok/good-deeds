import { createPortal } from "react-dom";
import styles from "./Modal.module.sass";
import { FC, ReactNode } from "react";

let modalRoot;

if (typeof document !== "undefined") {
  modalRoot = document.getElementById("__next");
}

interface ModalProps {
  onClose: () => void;
  onSubmit: () => void;
  submitText: string;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ onClose, onSubmit, submitText, children }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles["overlay"]} onClick={handleOverlayClick}>
      <div className={styles["modal"]}>
        {children}
        <button className={styles["closeBtn"]} onClick={onClose}></button>
        <button className={styles["submit"]} onClick={onSubmit}>
          {submitText}
        </button>
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
