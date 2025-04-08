import Modal from "../../utils/Modal/Modal";

import { Success2SVG } from "../../utils/SVG";

import styles from "./SuccessModal.module.css";

function SuccessModal({ visible, message }) {
  console.log(message);
  return (
    <Modal visible={visible} overrideStyle={styles.rootContainer}>
      <div
        className={`${styles.contentContainer} ${
          visible ? styles.visibleModal : styles.hiddenModal
        }`}
      >
        <Success2SVG />
        <p className={styles.title}>{message}</p>
      </div>
    </Modal>
  );
}

export default SuccessModal;
