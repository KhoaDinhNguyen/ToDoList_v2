import BounceLoader from "react-spinners/BounceLoader";

import Modal from "../../utils/Modal/Modal";

import styles from "./LoadingDatabaseModal.module.css";

function LoadingDatabaseModal({ visible }) {
  console.log("CAll this modal");
  return (
    <Modal visible={visible} overrideStyle={styles.rootContainer}>
      <div
        className={`${styles.contentContainer} ${
          visible ? styles.visibleModal : styles.hiddenModal
        }`}
      >
        <BounceLoader size={30} speedMultiplier={1.5} />
        <p className={styles.title}>Loading database...</p>
      </div>
    </Modal>
  );
}

export default LoadingDatabaseModal;
