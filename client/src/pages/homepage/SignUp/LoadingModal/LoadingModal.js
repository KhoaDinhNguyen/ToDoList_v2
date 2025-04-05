import Modal from "../../../../components/utils/Modal/Modal";
import FadeLoader from "react-spinners/FadeLoader";

import styles from "./LoadingModal.module.css";

function LoadingModal({ loading }) {
  return (
    <Modal visible={loading === true}>
      <div
        className={`${styles.contentContainer} ${
          loading ? styles.visibleModal : styles.hiddenModal
        }`}
      >
        <FadeLoader
          color="#000000"
          height={20}
          margin={7}
          radius={10}
          speedMultiplier={2}
        />
        <p className={styles.title}>Creating an account...</p>
      </div>
    </Modal>
  );
}

export default LoadingModal;
