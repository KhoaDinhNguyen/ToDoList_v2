import Modal from "../../utils/Modal/Modal";
import BeatLoader from "react-spinners/BeatLoader";

import styles from "./LoadingModal.module.css";

function LoadingModal({ visible, message }) {
  return (
    <Modal visible={visible} overrideStyle={styles.rootContainer}>
      <div
        className={`${styles.contentContainer} ${
          visible ? styles.visibleModal : styles.hiddenModal
        }`}
      >
        <BeatLoader />
        <p className={styles.title}>{message}...</p>
      </div>
    </Modal>
  );
}

export default LoadingModal;
