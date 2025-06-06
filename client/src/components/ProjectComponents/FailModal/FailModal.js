import Modal from "../../utils/Modal/Modal";

import { Error2SVG } from "../../utils/SVG";

import styles from "./FailModal.module.css";

function FailModal({ visible, message, error }) {
  return (
    <Modal visible={visible} overrideStyle={styles.rootContainer}>
      <div
        className={`${styles.contentContainer} ${
          visible ? styles.visibleModal : styles.hiddenModal
        }`}
      >
        <Error2SVG />
        <p className={styles.title}>
          {message}.{error}
        </p>
      </div>
    </Modal>
  );
}

export default FailModal;
