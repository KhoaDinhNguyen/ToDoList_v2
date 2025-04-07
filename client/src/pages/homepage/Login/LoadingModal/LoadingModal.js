import Modal from "../../../../components/utils/Modal/Modal";
import ClipLoader from "react-spinners/ClipLoader";

import styles from "./LoadingModal.module.css";

function LoadingModal({ visible }) {
  return (
    <Modal visible={visible} overrideStyle={styles.rootContainer}>
      <div
        className={`${styles.contentContainer} ${
          visible ? styles.visibleModal : styles.hiddenModal
        }`}
      >
        <ClipLoader />
        <p className={styles.title}>Authenticating...</p>
      </div>
    </Modal>
  );
}

export default LoadingModal;
