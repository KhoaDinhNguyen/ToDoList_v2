import Modal from "../../utils/Modal/Modal";
import GridLoader from "react-spinners/GridLoader";

import styles from "./LoadingModal.module.css";

function LoadingModal({ visible, message }) {
  return (
    <Modal visible={visible} overrideStyle={styles.rootContainer}>
      <div
        className={`${styles.contentContainer} ${
          visible ? styles.visibleModal : styles.hiddenModal
        }`}
      >
        <GridLoader size={10} />
        <p className={styles.title}>{message}...</p>
      </div>
    </Modal>
  );
}

export default LoadingModal;
