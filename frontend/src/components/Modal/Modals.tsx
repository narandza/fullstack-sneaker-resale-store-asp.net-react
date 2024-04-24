import React, { useState } from "react";
import styles from "./Modals.module.scss";
import { BiXCircle } from "react-icons/bi";

interface IModal {
  isOpen: boolean;
  heading: string;
  description?: string;
  onAccept?: () => void;
}

export function InfoModal({ isOpen, heading, description, onAccept }: IModal) {
  return (
    <div
      className={`${styles.modalOverlay} ${isOpen ? styles.showOverlay : ""}`}
    >
      <div className={styles.modal}>
        <h3 className={styles.heading}>{heading}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.buttons}>
          <button
            onClick={onAccept}
            className={`${styles.confirmButton} ${styles.modalButton}`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

interface IConfirmModal extends IModal {
  onCancel: () => void;
  onConfirm: (response: string) => void;
  inputType?: string;
}

export function ConfirmModal({
  isOpen,
  onCancel,
  onConfirm,
  heading,
  description,
  inputType,
}: IConfirmModal) {
  const [response, setResponse] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResponse(e.target.value);
  };

  const handleConfirm = () => {
    onConfirm(response);
  };

  return (
    <div
      className={`${styles.modalOverlay} ${isOpen ? styles.showOverlay : ""}`}
    >
      <div className={styles.modal}>
        <h3 className={styles.heading}>{heading}</h3>
        <p className={styles.description}>{description}</p>
        <input
          type={inputType ? inputType : "text"}
          value={response}
          onChange={handleChange}
          className={styles.userInput}
        />
        <div className={styles.buttons}>
          <button
            onClick={onCancel}
            className={`${styles.cancelButton} ${styles.modalButton}`}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`${styles.confirmButton} ${styles.modalButton}`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

interface IImageModal {
  isOpen: boolean;
  image: string;
  onClose: () => void;
}

export function ImageModal({ isOpen, image, onClose }: IImageModal) {
  return (
    <div
      className={`${styles.modalOverlay} ${isOpen ? styles.showOverlay : ""}`}
    >
      <div className={styles.modal}>
        <div className={styles.imageModal}>
          <BiXCircle onClick={onClose} className={styles.closeButton} />
          <div className={styles.imageContainer}>
            <img src={image} alt="modal" className={styles.image} />
          </div>
        </div>
      </div>
    </div>
  );
}
