import Modal from "../../utils/Modal/Modal";
import PacmanLoader from "react-spinners/PacmanLoader";

import styles from "./LoadingModal.module.css";

function LoadingModal({ visible, message }) {
  return (
    <Modal visible={visible} overrideStyle={styles.rootContainer}>
      <div
        className={`${styles.contentContainer} ${
          visible ? styles.visibleModal : styles.hiddenModal
        }`}
      >
        <PacmanLoader size={15} />
        <p className={styles.title}>{message}...</p>
      </div>
    </Modal>
  );
}

export default LoadingModal;
